// @generated by protobuf-ts 2.9.0 with parameter client_grpc1
// @generated from protobuf file "Flight.proto" (package "arrow.flight.protocol", syntax proto3)
// tslint:disable
//
//
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
// <p>
// http://www.apache.org/licenses/LICENSE-2.0
// <p>
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
import { FlightService } from "./Flight";
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { ActionType } from "./Flight";
import type { Empty } from "./Flight";
import type { Result } from "./Flight";
import type { Action } from "./Flight";
import type { PutResult } from "./Flight";
import type { FlightData } from "./Flight";
import type { Ticket } from "./Flight";
import type { SchemaResult } from "./Flight";
import type { FlightDescriptor } from "./Flight";
import type { FlightInfo } from "./Flight";
import type { Criteria } from "./Flight";
import type { HandshakeResponse } from "./Flight";
import type { HandshakeRequest } from "./Flight";
import * as grpc from "@grpc/grpc-js";
/**
 *
 * A flight service is an endpoint for retrieving or storing Arrow data. A
 * flight service can expose one or more predefined endpoints that can be
 * accessed using the Arrow Flight Protocol. Additionally, a flight service
 * can expose a set of actions that are available.
 *
 * @generated from protobuf service arrow.flight.protocol.FlightService
 */
export interface IFlightServiceClient {
    /**
     *
     * Handshake between client and server. Depending on the server, the
     * handshake may be required to determine the token that should be used for
     * future operations. Both request and response are streams to allow multiple
     * round-trips depending on auth mechanism.
     *
     * @generated from protobuf rpc: Handshake(stream arrow.flight.protocol.HandshakeRequest) returns (stream arrow.flight.protocol.HandshakeResponse);
     */
    handshake(metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientDuplexStream<HandshakeRequest, HandshakeResponse>;
    handshake(options?: grpc.CallOptions): grpc.ClientDuplexStream<HandshakeRequest, HandshakeResponse>;
    /**
     *
     * Get a list of available streams given a particular criteria. Most flight
     * services will expose one or more streams that are readily available for
     * retrieval. This api allows listing the streams available for
     * consumption. A user can also provide a criteria. The criteria can limit
     * the subset of streams that can be listed via this interface. Each flight
     * service allows its own definition of how to consume criteria.
     *
     * @generated from protobuf rpc: ListFlights(arrow.flight.protocol.Criteria) returns (stream arrow.flight.protocol.FlightInfo);
     */
    listFlights(input: Criteria, metadata?: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<FlightInfo>;
    listFlights(input: Criteria, options?: grpc.CallOptions): grpc.ClientReadableStream<FlightInfo>;
    /**
     *
     * For a given FlightDescriptor, get information about how the flight can be
     * consumed. This is a useful interface if the consumer of the interface
     * already can identify the specific flight to consume. This interface can
     * also allow a consumer to generate a flight stream through a specified
     * descriptor. For example, a flight descriptor might be something that
     * includes a SQL statement or a Pickled Python operation that will be
     * executed. In those cases, the descriptor will not be previously available
     * within the list of available streams provided by ListFlights but will be
     * available for consumption for the duration defined by the specific flight
     * service.
     *
     * @generated from protobuf rpc: GetFlightInfo(arrow.flight.protocol.FlightDescriptor) returns (arrow.flight.protocol.FlightInfo);
     */
    getFlightInfo(input: FlightDescriptor, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (err: grpc.ServiceError | null, value?: FlightInfo) => void): grpc.ClientUnaryCall;
    getFlightInfo(input: FlightDescriptor, metadata: grpc.Metadata, callback: (err: grpc.ServiceError | null, value?: FlightInfo) => void): grpc.ClientUnaryCall;
    getFlightInfo(input: FlightDescriptor, options: grpc.CallOptions, callback: (err: grpc.ServiceError | null, value?: FlightInfo) => void): grpc.ClientUnaryCall;
    getFlightInfo(input: FlightDescriptor, callback: (err: grpc.ServiceError | null, value?: FlightInfo) => void): grpc.ClientUnaryCall;
    /**
     *
     * For a given FlightDescriptor, get the Schema as described in Schema.fbs::Schema
     * This is used when a consumer needs the Schema of flight stream. Similar to
     * GetFlightInfo this interface may generate a new flight that was not previously
     * available in ListFlights.
     *
     * @generated from protobuf rpc: GetSchema(arrow.flight.protocol.FlightDescriptor) returns (arrow.flight.protocol.SchemaResult);
     */
    getSchema(input: FlightDescriptor, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (err: grpc.ServiceError | null, value?: SchemaResult) => void): grpc.ClientUnaryCall;
    getSchema(input: FlightDescriptor, metadata: grpc.Metadata, callback: (err: grpc.ServiceError | null, value?: SchemaResult) => void): grpc.ClientUnaryCall;
    getSchema(input: FlightDescriptor, options: grpc.CallOptions, callback: (err: grpc.ServiceError | null, value?: SchemaResult) => void): grpc.ClientUnaryCall;
    getSchema(input: FlightDescriptor, callback: (err: grpc.ServiceError | null, value?: SchemaResult) => void): grpc.ClientUnaryCall;
    /**
     *
     * Retrieve a single stream associated with a particular descriptor
     * associated with the referenced ticket. A Flight can be composed of one or
     * more streams where each stream can be retrieved using a separate opaque
     * ticket that the flight service uses for managing a collection of streams.
     *
     * @generated from protobuf rpc: DoGet(arrow.flight.protocol.Ticket) returns (stream arrow.flight.protocol.FlightData);
     */
    doGet(input: Ticket, metadata?: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<FlightData>;
    doGet(input: Ticket, options?: grpc.CallOptions): grpc.ClientReadableStream<FlightData>;
    /**
     *
     * Push a stream to the flight service associated with a particular
     * flight stream. This allows a client of a flight service to upload a stream
     * of data. Depending on the particular flight service, a client consumer
     * could be allowed to upload a single stream per descriptor or an unlimited
     * number. In the latter, the service might implement a 'seal' action that
     * can be applied to a descriptor once all streams are uploaded.
     *
     * @generated from protobuf rpc: DoPut(stream arrow.flight.protocol.FlightData) returns (stream arrow.flight.protocol.PutResult);
     */
    doPut(metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientDuplexStream<FlightData, PutResult>;
    doPut(options?: grpc.CallOptions): grpc.ClientDuplexStream<FlightData, PutResult>;
    /**
     *
     * Open a bidirectional data channel for a given descriptor. This
     * allows clients to send and receive arbitrary Arrow data and
     * application-specific metadata in a single logical stream. In
     * contrast to DoGet/DoPut, this is more suited for clients
     * offloading computation (rather than storage) to a Flight service.
     *
     * @generated from protobuf rpc: DoExchange(stream arrow.flight.protocol.FlightData) returns (stream arrow.flight.protocol.FlightData);
     */
    doExchange(metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientDuplexStream<FlightData, FlightData>;
    doExchange(options?: grpc.CallOptions): grpc.ClientDuplexStream<FlightData, FlightData>;
    /**
     *
     * Flight services can support an arbitrary number of simple actions in
     * addition to the possible ListFlights, GetFlightInfo, DoGet, DoPut
     * operations that are potentially available. DoAction allows a flight client
     * to do a specific action against a flight service. An action includes
     * opaque request and response objects that are specific to the type action
     * being undertaken.
     *
     * @generated from protobuf rpc: DoAction(arrow.flight.protocol.Action) returns (stream arrow.flight.protocol.Result);
     */
    doAction(input: Action, metadata?: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<Result>;
    doAction(input: Action, options?: grpc.CallOptions): grpc.ClientReadableStream<Result>;
    /**
     *
     * A flight service exposes all of the available action types that it has
     * along with descriptions. This allows different flight consumers to
     * understand the capabilities of the flight service.
     *
     * @generated from protobuf rpc: ListActions(arrow.flight.protocol.Empty) returns (stream arrow.flight.protocol.ActionType);
     */
    listActions(input: Empty, metadata?: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<ActionType>;
    listActions(input: Empty, options?: grpc.CallOptions): grpc.ClientReadableStream<ActionType>;
}
/**
 *
 * A flight service is an endpoint for retrieving or storing Arrow data. A
 * flight service can expose one or more predefined endpoints that can be
 * accessed using the Arrow Flight Protocol. Additionally, a flight service
 * can expose a set of actions that are available.
 *
 * @generated from protobuf service arrow.flight.protocol.FlightService
 */
export class FlightServiceClient extends grpc.Client implements IFlightServiceClient {
    private readonly _binaryOptions: Partial<BinaryReadOptions & BinaryWriteOptions>;
    constructor(address: string, credentials: grpc.ChannelCredentials, options: grpc.ClientOptions = {}, binaryOptions: Partial<BinaryReadOptions & BinaryWriteOptions> = {}) {
        super(address, credentials, options);
        this._binaryOptions = binaryOptions;
    }
    /**
     *
     * Handshake between client and server. Depending on the server, the
     * handshake may be required to determine the token that should be used for
     * future operations. Both request and response are streams to allow multiple
     * round-trips depending on auth mechanism.
     *
     * @generated from protobuf rpc: Handshake(stream arrow.flight.protocol.HandshakeRequest) returns (stream arrow.flight.protocol.HandshakeResponse);
     */
    handshake(metadata?: grpc.Metadata | grpc.CallOptions, options?: grpc.CallOptions): grpc.ClientDuplexStream<HandshakeRequest, HandshakeResponse> {
        const method = FlightService.methods[0];
        return this.makeBidiStreamRequest<HandshakeRequest, HandshakeResponse>(`/${FlightService.typeName}/${method.name}`, (value: HandshakeRequest): Buffer => Buffer.from(method.I.toBinary(value, this._binaryOptions)), (value: Buffer): HandshakeResponse => method.O.fromBinary(value, this._binaryOptions), (metadata as any), options);
    }
    /**
     *
     * Get a list of available streams given a particular criteria. Most flight
     * services will expose one or more streams that are readily available for
     * retrieval. This api allows listing the streams available for
     * consumption. A user can also provide a criteria. The criteria can limit
     * the subset of streams that can be listed via this interface. Each flight
     * service allows its own definition of how to consume criteria.
     *
     * @generated from protobuf rpc: ListFlights(arrow.flight.protocol.Criteria) returns (stream arrow.flight.protocol.FlightInfo);
     */
    listFlights(input: Criteria, metadata?: grpc.Metadata | grpc.CallOptions, options?: grpc.CallOptions): grpc.ClientReadableStream<FlightInfo> {
        const method = FlightService.methods[1];
        return this.makeServerStreamRequest<Criteria, FlightInfo>(`/${FlightService.typeName}/${method.name}`, (value: Criteria): Buffer => Buffer.from(method.I.toBinary(value, this._binaryOptions)), (value: Buffer): FlightInfo => method.O.fromBinary(value, this._binaryOptions), input, (metadata as any), options);
    }
    /**
     *
     * For a given FlightDescriptor, get information about how the flight can be
     * consumed. This is a useful interface if the consumer of the interface
     * already can identify the specific flight to consume. This interface can
     * also allow a consumer to generate a flight stream through a specified
     * descriptor. For example, a flight descriptor might be something that
     * includes a SQL statement or a Pickled Python operation that will be
     * executed. In those cases, the descriptor will not be previously available
     * within the list of available streams provided by ListFlights but will be
     * available for consumption for the duration defined by the specific flight
     * service.
     *
     * @generated from protobuf rpc: GetFlightInfo(arrow.flight.protocol.FlightDescriptor) returns (arrow.flight.protocol.FlightInfo);
     */
    getFlightInfo(input: FlightDescriptor, metadata: grpc.Metadata | grpc.CallOptions | ((err: grpc.ServiceError | null, value?: FlightInfo) => void), options?: grpc.CallOptions | ((err: grpc.ServiceError | null, value?: FlightInfo) => void), callback?: ((err: grpc.ServiceError | null, value?: FlightInfo) => void)): grpc.ClientUnaryCall {
        const method = FlightService.methods[2];
        return this.makeUnaryRequest<FlightDescriptor, FlightInfo>(`/${FlightService.typeName}/${method.name}`, (value: FlightDescriptor): Buffer => Buffer.from(method.I.toBinary(value, this._binaryOptions)), (value: Buffer): FlightInfo => method.O.fromBinary(value, this._binaryOptions), input, (metadata as any), (options as any), (callback as any));
    }
    /**
     *
     * For a given FlightDescriptor, get the Schema as described in Schema.fbs::Schema
     * This is used when a consumer needs the Schema of flight stream. Similar to
     * GetFlightInfo this interface may generate a new flight that was not previously
     * available in ListFlights.
     *
     * @generated from protobuf rpc: GetSchema(arrow.flight.protocol.FlightDescriptor) returns (arrow.flight.protocol.SchemaResult);
     */
    getSchema(input: FlightDescriptor, metadata: grpc.Metadata | grpc.CallOptions | ((err: grpc.ServiceError | null, value?: SchemaResult) => void), options?: grpc.CallOptions | ((err: grpc.ServiceError | null, value?: SchemaResult) => void), callback?: ((err: grpc.ServiceError | null, value?: SchemaResult) => void)): grpc.ClientUnaryCall {
        const method = FlightService.methods[3];
        return this.makeUnaryRequest<FlightDescriptor, SchemaResult>(`/${FlightService.typeName}/${method.name}`, (value: FlightDescriptor): Buffer => Buffer.from(method.I.toBinary(value, this._binaryOptions)), (value: Buffer): SchemaResult => method.O.fromBinary(value, this._binaryOptions), input, (metadata as any), (options as any), (callback as any));
    }
    /**
     *
     * Retrieve a single stream associated with a particular descriptor
     * associated with the referenced ticket. A Flight can be composed of one or
     * more streams where each stream can be retrieved using a separate opaque
     * ticket that the flight service uses for managing a collection of streams.
     *
     * @generated from protobuf rpc: DoGet(arrow.flight.protocol.Ticket) returns (stream arrow.flight.protocol.FlightData);
     */
    doGet(input: Ticket, metadata?: grpc.Metadata | grpc.CallOptions, options?: grpc.CallOptions): grpc.ClientReadableStream<FlightData> {
        const method = FlightService.methods[4];
        return this.makeServerStreamRequest<Ticket, FlightData>(`/${FlightService.typeName}/${method.name}`, (value: Ticket): Buffer => Buffer.from(method.I.toBinary(value, this._binaryOptions)), (value: Buffer): FlightData => method.O.fromBinary(value, this._binaryOptions), input, (metadata as any), options);
    }
    /**
     *
     * Push a stream to the flight service associated with a particular
     * flight stream. This allows a client of a flight service to upload a stream
     * of data. Depending on the particular flight service, a client consumer
     * could be allowed to upload a single stream per descriptor or an unlimited
     * number. In the latter, the service might implement a 'seal' action that
     * can be applied to a descriptor once all streams are uploaded.
     *
     * @generated from protobuf rpc: DoPut(stream arrow.flight.protocol.FlightData) returns (stream arrow.flight.protocol.PutResult);
     */
    doPut(metadata?: grpc.Metadata | grpc.CallOptions, options?: grpc.CallOptions): grpc.ClientDuplexStream<FlightData, PutResult> {
        const method = FlightService.methods[5];
        return this.makeBidiStreamRequest<FlightData, PutResult>(`/${FlightService.typeName}/${method.name}`, (value: FlightData): Buffer => Buffer.from(method.I.toBinary(value, this._binaryOptions)), (value: Buffer): PutResult => method.O.fromBinary(value, this._binaryOptions), (metadata as any), options);
    }
    /**
     *
     * Open a bidirectional data channel for a given descriptor. This
     * allows clients to send and receive arbitrary Arrow data and
     * application-specific metadata in a single logical stream. In
     * contrast to DoGet/DoPut, this is more suited for clients
     * offloading computation (rather than storage) to a Flight service.
     *
     * @generated from protobuf rpc: DoExchange(stream arrow.flight.protocol.FlightData) returns (stream arrow.flight.protocol.FlightData);
     */
    doExchange(metadata?: grpc.Metadata | grpc.CallOptions, options?: grpc.CallOptions): grpc.ClientDuplexStream<FlightData, FlightData> {
        const method = FlightService.methods[6];
        return this.makeBidiStreamRequest<FlightData, FlightData>(`/${FlightService.typeName}/${method.name}`, (value: FlightData): Buffer => Buffer.from(method.I.toBinary(value, this._binaryOptions)), (value: Buffer): FlightData => method.O.fromBinary(value, this._binaryOptions), (metadata as any), options);
    }
    /**
     *
     * Flight services can support an arbitrary number of simple actions in
     * addition to the possible ListFlights, GetFlightInfo, DoGet, DoPut
     * operations that are potentially available. DoAction allows a flight client
     * to do a specific action against a flight service. An action includes
     * opaque request and response objects that are specific to the type action
     * being undertaken.
     *
     * @generated from protobuf rpc: DoAction(arrow.flight.protocol.Action) returns (stream arrow.flight.protocol.Result);
     */
    doAction(input: Action, metadata?: grpc.Metadata | grpc.CallOptions, options?: grpc.CallOptions): grpc.ClientReadableStream<Result> {
        const method = FlightService.methods[7];
        return this.makeServerStreamRequest<Action, Result>(`/${FlightService.typeName}/${method.name}`, (value: Action): Buffer => Buffer.from(method.I.toBinary(value, this._binaryOptions)), (value: Buffer): Result => method.O.fromBinary(value, this._binaryOptions), input, (metadata as any), options);
    }
    /**
     *
     * A flight service exposes all of the available action types that it has
     * along with descriptions. This allows different flight consumers to
     * understand the capabilities of the flight service.
     *
     * @generated from protobuf rpc: ListActions(arrow.flight.protocol.Empty) returns (stream arrow.flight.protocol.ActionType);
     */
    listActions(input: Empty, metadata?: grpc.Metadata | grpc.CallOptions, options?: grpc.CallOptions): grpc.ClientReadableStream<ActionType> {
        const method = FlightService.methods[8];
        return this.makeServerStreamRequest<Empty, ActionType>(`/${FlightService.typeName}/${method.name}`, (value: Empty): Buffer => Buffer.from(method.I.toBinary(value, this._binaryOptions)), (value: Buffer): ActionType => method.O.fromBinary(value, this._binaryOptions), input, (metadata as any), options);
    }
}
