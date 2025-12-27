const net = require('node:net');

const sockets = [];

const server = net.createServer((socket)=>{
    console.log('client connected');
    const clientId = `${socket.remoteAddress}:${socket.remotePort}`;
    console.log(`client connected: ${clientId}`);
    socket.setEncoding('utf-8');
    sockets.push(socket);

    socket.write(`welcome ! Online : ${sockets.length} \n\n`)

    const broadcast = (message, sender) => {
        sockets.forEach(client => {
            if ( client !== sender ){
                client.write(message);
            }
        })
    };

    broadcast(`${clientId} has joined server`, socket);
    
    let message = []
    socket.on('data', (data)=>{
        message.push(data);
        if ( message.join(''.endsWith('\r\n'))){
            console.log(`${clientId}: ${message.join("")}`);
            broadcast(`${clientId}: ${message.join("")}`, socket);
            message = [];
        }
    });

    

    socket.on('end', ()=>{
        console.log(`client disconnected ${clientId}`);

        const index = sockets.indexOf(socket);
        if (index !== -1 ){
            sockets.splice(index, 1);
        };

        broadcast(`${clientId} left the chat`);
    });

    socket.on('error', (err)=>{
        console.log(`error from ${clientId} : `, err);
    });    
});

server.listen(8080, '127.0.0.1');

server.on('error', (err)=>{
    console.log("server error ! : ", err)
})