const net = require('node:net');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const socket = net.createConnection({
    host: '127.0.0.1',
    port: 8080,
}, async ()=>{
    console.log('connected');
});

rl.setPrompt('=> ');
rl.prompt();

socket.on('connect', ()=>{
    rl.on('line', line => {
        socket.write(line + '\r\n')
        rl.prompt();
    });
})

socket.on('data', (data)=>{
    console.log(data.toString('utf-8'));
});

socket.on('close', ()=>{
    console.log("Disconnected")
})

