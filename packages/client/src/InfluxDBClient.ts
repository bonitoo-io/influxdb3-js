import WriteApi from './WriteApi'
import {Transport} from './transport'
import WriteApiImpl from './impl/WriteApiImpl'
// replaced by ./impl/browser/FetchTransport in browser builds
import TransportImpl from './impl/node/NodeHttpTransport'
import {ClientOptions, QueryType, WriteOptions} from './options'
import {IllegalArgumentError} from './errors'
import {Point} from './Point'
import {convertTime} from './util/time'
import {isDefined} from './util/common'
/**
 * InfluxDB's entry point that configures communication with InfluxDB 3 server and provide APIs to write and query data.
 */
import * as grpc from '@grpc/grpc-js'
import {FlightServiceClient} from './generated/Flight.grpc-client'
import {FlightData, Ticket} from './generated/Flight'
import {Message, Schema} from 'apache-arrow'
import {tableFromIPC} from 'apache-arrow'
import {toUint8Array} from 'apache-arrow/util/buffer'
import { RecordBatch } from "apache-arrow/ipc/metadata/message"

function concatenateUint8Arrays(arrays: Uint8Array[]) {
  // Calculate the total length of the concatenated array
  let totalLength = 0
  for (let i = 0; i < arrays.length; i++) {
    totalLength += arrays[i].length
  }

  // Create a new Uint8Array with the total length
  const concatenatedArray = new Uint8Array(totalLength)

  // Copy each array into the concatenated array
  let offset = 0
  for (let i = 0; i < arrays.length; i++) {
    concatenatedArray.set(arrays[i], offset)
    offset += arrays[i].length
  }

  return concatenatedArray
}

export default class InfluxDBClient {
  private readonly _options: ClientOptions
  private readonly _writeApi: WriteApi
  readonly transport: Transport

  /**
   * Creates influxdb client options from an options object or url.
   * @param options - client options
   */
  constructor(options: ClientOptions | string) {
    if (typeof options === 'string') {
      this._options = {url: options}
    } else if (options !== null && typeof options === 'object') {
      this._options = options
    } else {
      throw new IllegalArgumentError('No url or configuration specified!')
    }
    const url = this._options.url
    if (typeof url !== 'string')
      throw new IllegalArgumentError('No url specified!')
    if (url.endsWith('/')) this._options.url = url.substring(0, url.length - 1)
    this.transport = this._options.transport ?? new TransportImpl(this._options)
    this._writeApi = new WriteApiImpl(this.transport)
  }

  private _mergeWriteOptions = (writeOptions?: Partial<WriteOptions>) => {
    return {
      ...this._options.writeOptions,
      ...writeOptions,
    }
  }

  async write(
    lines: string | ArrayLike<string>,
    database: string,
    org?: string,
    writeOptions?: Partial<WriteOptions>
  ): Promise<void> {
    await this._writeApi.doWrite(
      typeof lines === 'string' ? [lines] : Array.from(lines),
      database,
      org,
      this._mergeWriteOptions(writeOptions)
    )
  }

  async writePoint(
    point: Point,
    database: string,
    org?: string,
    writeOptions?: Partial<WriteOptions>
  ): Promise<void> {
    await this.writePoints([point], database, org, writeOptions)
  }

  async writePoints(
    points: ArrayLike<Point>,
    database: string,
    org?: string,
    writeOptions?: Partial<WriteOptions>
  ): Promise<void> {
    await this._writeApi.doWrite(
      Array.from(points)
        .map((p) => p.toLineProtocol())
        .filter(isDefined),
      database,
      org,
      this._mergeWriteOptions(writeOptions)
    )
  }

  async *query(
    query: string,
    database: string,
    queryType: QueryType = 'sql'
  ): AsyncGenerator<Map<string, any>, void, void> {
    const client = new FlightServiceClient(
      'us-east-1-1.aws.cloud2.influxdata.com:443',
      // grpc.credentials.createInsecure()
      grpc.credentials.createSsl()
    )

    void tableFromIPC
    void toUint8Array

    const ticketData = {
      database: database,
      sql_query: query,
      query_type: queryType,
    }
    const ticket = Ticket.create({
      ticket: new TextEncoder().encode(JSON.stringify(ticketData)),
    })

    // console.log(ticketData)
    // const ticket = Ticket.create({
    //   ticket: Uint8Array.from([]),
    // })

    const metadata = new grpc.Metadata()
    const token = this._options.token
    if (token) metadata.set('authorization', 'Bearer ' + token)

    const dataCol: FlightData[] = []

    client
      .doGet(ticket, metadata)
      .addListener('data', async (data: FlightData) => {
        dataCol.push(data)
        console.log()
      })
      .addListener('end', async () => {
        console.log('end')
        const data = concatenateUint8Arrays(dataCol.map((x) => x.dataBody))
        void data

        dataCol.forEach((x, i) => {
          const message = Message.decode(dataCol[i].dataHeader)
          void message

          const messageType = message.header()
          void messageType

          if (messageType instanceof Schema) {
            const fields = messageType.fields
            void fields
          }

          if (message.isRecordBatch()) {
            const messageType = message.header() as any as RecordBatch
            const buffers = messageType.buffers
            void buffers
          }
        })
      })
      .addListener('error', (e) => {
        console.error(e)
      })
      .read()

    const mockData: Map<string, any>[] = [
      new Map(
        Object.entries({
          unit: 'temperature',
          avg: 23.2,
          max: 45.0,
        })
      ),
    ]

    for (const row of mockData) {
      yield row
    }
  }

  get convertTime() {
    return (value: string | number | Date | undefined) =>
      convertTime(value, this._options.writeOptions?.precision)
  }

  async close(): Promise<void> {
    await this._writeApi.close()
  }
}
