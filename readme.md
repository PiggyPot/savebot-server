# Savebot server

This server is built in `Node` and `Express`, and uses `Socket.io` for realtime
communication to the clients. You will need Node `v7.6.0` or
higher.

To get it running:
1. Navigate to root directory (where this readme lives)
2. `npm install`
3. `npm start`

The server will need kept up with a package like `forever`, this should be easily
done.

The server runs off port 3000 by default. 

The client will expect a connection to the savebot server to function.


Editing the server:

There's only a few files to care about here. `utils/settings.js` has some constants set up
for API keys and such, `utils/watson.js` sets up a wrapper function to send
messages to ibm watson, and recieve & emit them through `socket.io`. `index.js`
handles client connections, and recieving messages.
