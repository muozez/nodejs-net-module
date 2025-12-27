const net = require('node:net');

const args = process.argv;
const portIndex = args.indexOf('--port');
const port = portIndex !== -1 ? Number(args[portIndex + 1]) : 3000;

const server = net.createServer(socket => {
  console.log(`SERVER ${port}`);

  const body = `I'm ${port}\n`;

  socket.write(
    `HTTP/1.1 200 OK\r\n` +
    `Content-Type: text/plain\r\n` +
    `Content-Length: ${Buffer.byteLength(body)}\r\n\r\n` +
    body
  );

  socket.end();
});

server.listen(port);
