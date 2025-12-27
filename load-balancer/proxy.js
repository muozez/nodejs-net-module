const net = require('node:net');

const servers = [
    { host: '127.0.0.1', port: 3000, weight: 1, current: 0},
    { host: '127.0.0.1', port: 3001, weight: 3, current: 0},
    { host: '127.0.0.1', port: 3002, weight: 2, current: 0},
];

const getNextServer = () => {
    let total = 0;
    let best = null;

    for ( const s of servers ){
        s.current += s.weight;
        total += s.weight;
        if (!best || s.current > best.current){
            best = s;
        };
    }
    best.current -= total;
    return best
}

const balancer = net.createServer(clientSocket => {
    const target = getNextServer();

    const targetSocket = net.connect(target.port, target.host);

    clientSocket.pipe(targetSocket);
    targetSocket.pipe(clientSocket);

    clientSocket.on('error', () => targetSocket.destroy());
    targetSocket.on('error', () => clientSocket.destroy());
});

balancer.listen(8000, ()=> {
    console.log("Balancer live at 8000")
})