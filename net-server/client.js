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
        if (line === 'quit'){
            socket.end()
            rl.close();
            return
        }
        socket.write(line + '\r\n')
        rl.prompt();
    });
})

socket.on('data', (data)=>{
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    console.log(data.toString('utf-8'));
    rl.prompt()
});

socket.on('close', ()=>{
    console.log("Disconnected")
})

socket.on('error', ()=>{
    console.log('an error occurred')
})