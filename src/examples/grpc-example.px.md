# gRPC k6 Script Example

[Link to Script](./grpc-example.px.ts)

Please read the [k6 gRPC documentation](https://k6.io/docs/javascript-api/k6-net-grpc)
 which covers this example and breaks it down.

It uses [grpcbin](https://grpcbin.test.k6.io/) as the endpoint,
 which is a great resource for practicing gRPC scripting with k6
 and debugging any problems.

The k6 gRPC library `k6/net/grpc` didn't seem to be included in the `@types/k6`
 so [I've created my own](../../decs.d.ts) based on the documentation.
 If you have any issues see the [API docs](https://k6.io/docs/javascript-api/k6-net-grpc)

More information about gRPC can be found [on their website](https://grpc.io/docs/languages/node/quickstart/).

To run the script:

```bash
npm run go dist/grpc-example.px.js
```