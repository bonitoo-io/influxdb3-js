import {Transport} from './transport'

/**
 * Option for the communication with InfluxDB server.
 */
export interface ConnectionOptions {
  /** base host URL */
  host: string
  /** authentication token */
  token?: string
  /**
   * socket timeout, 10000 milliseconds by default in node.js
   * @defaultValue 10000
   */
  timeout?: number
  /**
   * default database for write query if not present as argument.
   */
  database?: string
  /**
   * TransportOptions supply extra options for the transport layer, they differ between node.js and browser/deno.
   * Node.js transport accepts options specified in {@link https://nodejs.org/api/http.html#http_http_request_options_callback | http.request } or
   * {@link https://nodejs.org/api/https.html#https_https_request_options_callback | https.request }. For example, an `agent` property can be set to
   * {@link https://www.npmjs.com/package/proxy-http-agent | setup HTTP/HTTPS proxy }, {@link  https://nodejs.org/api/tls.html#tls_tls_connect_options_callback | rejectUnauthorized }
   * property can disable TLS server certificate verification. Additionally,
   * {@link https://github.com/follow-redirects/follow-redirects | follow-redirects } property can be also specified
   * in order to follow redirects in node.js.
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/fetch | fetch } is used under the hood in browser/deno.
   * For example,
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/fetch | redirect } property can be set to 'error' to abort request if a redirect occurs.
   */
  transportOptions?: {[key: string]: any}
  /**
   * Default HTTP headers to send with every request.
   */
  headers?: Record<string, string>
  /**
   * Full HTTP web proxy URL including schema, for example http://your-proxy:8080.
   */
  proxyUrl?: string
}

/** default connection options */
export const DEFAULT_ConnectionOptions: Partial<ConnectionOptions> = {
  timeout: 10000,
}

/**
 * Options used by {@link InfluxDBClient.write} .
 */
export interface WriteOptions {
  /** Precision to use in writes for timestamp. default ns */
  precision: WritePrecision
  /** HTTP headers that will be sent with every write request */
  headers?: {[key: string]: string}
  /** When specified, write bodies larger than the threshold are gzipped  */
  gzipThreshold?: number
  /** InfluxDB Enterprise write consistency as explained in https://docs.influxdata.com/enterprise_influxdb/v1.9/concepts/clustering/#write-consistency */
  consistency?: 'any' | 'one' | 'quorum' | 'all'
}

/** default writeOptions */
export const DEFAULT_WriteOptions: WriteOptions = {
  precision: 'ns',
  gzipThreshold: 1000,
}

export type QueryType = 'sql' | 'influxql'

/**
 * Options used by {@link InfluxDBClient} .
 */
export interface ClientOptions extends ConnectionOptions {
  /** supplies and overrides default writing options */
  writeOptions?: Partial<WriteOptions>
  /** specifies custom transport */
  transport?: Transport
}

/**
 * Timestamp precision used in write operations.
 * See {@link https://docs.influxdata.com/influxdb/latest/api/#operation/PostWrite }
 */
export type WritePrecision = 'ns' | 'us' | 'ms' | 's'
