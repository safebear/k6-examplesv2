declare module 'k6/x/sql' {
  /**
   * Opens the connection to the DB
   * Follow this link for more details about connection strings
   * https://pkg.go.dev/github.com/lib/pq#hdr-Connection_String_Parameters
   * @param dbType type of database (mysql, postgres or sqlite3 are all supported)
   * @param connection connection string for the database
   */
  export function open(
    dbType: 'mysql' | 'postgres' | 'sqlite3',
    connection: string
  ): db;

  /**
   * Use this to send SELECT queries. It returns an array of objects.
   * Each object contains the data from each row that is returned.
   * It uses generics, so you will need to pass through an interface or type for this object,
   * which is based on the number of columns and the data types that are returned.
   * @param db db object
   * @param query db SELECT query as a string
   */
  export function query<T>(db: db, query: string): Array<T>;

  interface db {
    /**
     * 'exec' function is used for any query that will update the database.
     * E.g. INSERT, CREATE, UPDATE, DROP etc.
     * @param query db query as a string
     */
    exec: (query: string) => void;
    /**
     * Closes the database connection
     */
    close: () => void;
  }
}

declare module 'k6/net/grpc' {
  export {
    StatusOK,
    StatusCanceled,
    StatusUnknown,
    StatusInvalidArgument,
    StatusDeadlineExceeded,
    StatusNotFound,
    StatusAlreadyExists,
    StatusPermissionDenied,
    StatusResourceExhausted,
    StatusFailedPrecondition,
    StatusAborted,
    StatusOutOfRange,
    StatusUnimplemented,
    StatusInternal,
    StatusUnavailable,
    StatusDataLoss,
    StatusUnauthenticated
  };

  /**
   * A gRPC client that can interact with a gRPC server.
   */
  export class Client {
    /**
     * Loads and parses the protocol buffer descriptors so they are available to the client to marshal/unmarshal the correct request and response data structures for the RPC schema.
     * @param importPaths The paths used to search for dependencies that are referenced in import statements in proto source files. If no import paths are provided then "." (current directory) is assumed to be the only import path.
     * @param protoFiles Rest parameters for the list of proto files to load/parse.
     */
    load(importPaths: string[] | null, ...protoFiles: string[]): void;
    /**
     * Opens a connection to a gRPC server; will block until a connection is made or a connection error is thrown.
     * Cannot be called during the k6 `init` phase.
     * @param address The address of the gRPC server. Should be in the form: host:port with no protocol prefix e.g. `grpc.k6.io:443`.
     * @param params `ConnectParams` object containing additional connect parameters.
     */
    connect(address: string, params?: ConnectParams): void;
    /**
     * Invokes an unary RPC request to the given method.
     * The given method to invoke must have its RPC schema previously loaded via the `Client.load()` function, otherwise an error will be thrown.
     * `Client.connect()` must be called first before invoking a request, otherwise an error will be thrown.
     * @param url The gRPC method url to invoke, in the form `/package.Service/Method`, e.g. `/google.cloud.language.v1.LanguageService/AnalyzeSentiment`.
     * @param request The canonical request object, as-per the Protobuf JSON Mapping.
     * @param params Params object containing additional request parameters.
     * @returns gRPC `Response` object.
     */
    invoke(
      url: string,
      request: Record<string, unknown>,
      params?: Params
    ): Response;
    /**
     * Close the connection to the gRPC service. Tear down all underlying connections.
     */
    close(): void;
  }
  interface ConnectParams {
    plaintext?: boolean;
    timeout?: number;
  }
  interface Params {
    headers?: Record<string, string>;
    tags?: Record<string, string>;
    timeout?: number;
  }
  interface Response {
    status: number;
    message: Record<string, unknown> | null;
    headers: Record<string, string>;
    trailers: Record<string, string>;
    error: Record<string, string> | null;
  }
}
