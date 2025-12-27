class Server {
    constructor(name, weight){
        this.name = name;
        this.weight = weight;
    };
    getName(){
        return this.name;
    };
    getWeight(){
        return this.weight;
    };
};

class weightedRoundRobin {
    constructor(servers){
        this.servers = servers;
        this.totalWeight = this.calculateTotalWeight(servers);
        this.cumulativeWeights = this.calculateCumulativeWeight(servers);
        this.currentIndex = 0;
        this.random = Math.random();
    }

    calculateTotalWeight(servers){
        let totalWeight = 0;
        for ( let server of servers ){
            totalWeight += server.getWeight();
        }
        return totalWeight;
    }
    calculateCumulativeWeight(servers){
        let cumulativeWeights = new Array(servers.length).fill(0);
        cumulativeWeights[0] = servers[0].getWeight();
        for (let i = 1; i < servers.length ; i++){
            cumulativeWeights[i] = cumulativeWeights[i-1]+servers[i].getWeight();
        }
        return cumulativeWeights;
    }
    getNextServer(){
        const randomValue = Math.floor(Math.random() * this.totalWeight);
        for (let i = 0; i < this.cumulativeWeights.length; i++){
            if (randomValue < this.cumulativeWeights[i]){
                return this.servers[i];
            }
        }
    }
}

let serverList = [
    new Server("Server 1", 2),
    new Server("Server 2", 3),
    new Server("Server 3", 1)
];

let balancer = new weightedRoundRobin(serverList);

for( let i = 0 ; i < 10 ; i++){
    let nextServer = balancer.getNextServer();
    console.log(`request ${i+1}: routed to ${nextServer.getName()}`)
}