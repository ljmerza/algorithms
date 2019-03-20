function directedGraph() {
    this.edges = {};
}

directedGraph.prototype.addVertex = function (vertex) {
    this.edges[vertex] = {};
}

directedGraph.prototype.addEdge = function (originVertex, destinationVertex, weight) {
    if (weight === undefined) weight = 0;
    this.edges[originVertex][destinationVertex] = weight;
}

const digraph1 = new directedGraph();
digraph1.addVertex("A");
digraph1.addVertex("B");
digraph1.addVertex("C");
digraph1.addEdge("A", "B", 1);
digraph1.addEdge("B", "C", 2);
digraph1.addEdge("C", "A", 3);
console.log(digraph1.edges)

directedGraph.prototype.removeEdge = function (originVertex, destinationVertex) {
    if (this.edges[originVertex] && this.edges[originVertex][destinationVertex] !== undefined) {
        this.edges[originVertex][destinationVertex] = undefined;
    }
}

directedGraph.prototype.removeVertex = function (vertex) {
    for (const adjacentVertex in this.edges[vertex]) {
        this.removeEdge(adjacentVertex, vertex);
    }

    this.edges[vertex] = undefined;
}