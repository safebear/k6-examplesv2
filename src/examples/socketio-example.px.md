# socket.io k6 Example Script

[Link to Script](./socketio-example.px.ts)

k6 doesn't officially support [socket.io](https://socket.io/),
 so this is a bit of a hack.

This script runs against a locally-built socket.io application.
 To run the app, run the following command:

```bash
node socketio-app/index.js
```

Then navigation to `http://localhost:3000` to see the chat window open
 (send some messages using the input box at the bottom of the window to see how it works).

Then run this script:

```bash
npm run go dist/socketio-example.px.js
```

And watch the messages appear in the chat window.

> PLEASE NOTE: When adapting this example for your application, the HTTP requests sent to make the initial connection in the [makeConnection](./../libs/socket.io.ts) function will probably need to be changed for your setup (and may also need authorization). Use the `network` tab in chrome devtools to see what HTTP requests are sent to setup the `socket.io` client connection for your application.


This script is based on how [k6 handles Websockets](https://k6.io/docs/using-k6/protocols/websockets)
 . Here's [some examples](https://k6.io/docs/examples/websockets) and the [k6 API](https://k6.io/docs/javascript-api/k6-ws).

It also uses tips from the [open issue on the k6 github](https://github.com/loadimpact/k6/issues/1306).
 It's also worth reading up on the [socket.io internals](https://socket.io/docs/v2/internals/)
 as this will help you to understand what's going on.

Here's some useful k6 community links about performance testing websockets:

1. [mixing websockets and http](https://community.k6.io/t/websockets-and-http-requests-on-k6-scripts/861)
2. [and again](https://community.k6.io/t/using-requests-in-combination-with-websockets/620)
3. [performance test websockets](https://github.com/Julianhm9612/k6-performance-test-websocket)
