function UniDirectedGraph() {
    this.edges = {};
}

/**
 * to add edges, vertices (nodes) must be added first
 */
UniDirectedGraph.prototype.addVertex = function (vertex) {
    this.edges[vertex] = {};
}

/**
 * adding weights by nested object in edges object
 */
UniDirectedGraph.prototype.addEdge = function (vertex1, vertex2, weight) {
    if (weight == undefined) weight = 0;

    this.edges[vertex1][vertex2] = weight;
    this.edges[vertex2][vertex1] = weight;
}

const graph1 = new UniDirectedGraph();
graph1.addVertex(1);
graph1.addVertex(2);
graph1.addEdge(1, 2, 1);
console.log(graph1.edges); // 1: {2: 0}, 2: {1: 0}

graph1.addVertex(3);
graph1.addVertex(4);
graph1.addVertex(5);
graph1.addEdge(2, 3, 8);
graph1.addEdge(3, 4, 10);
graph1.addEdge(4, 5, 100);
graph1.addEdge(1, 5, 88);
console.log(graph1.edges);


UniDirectedGraph.prototype.removeEdge = function (vertex1, vertex2) {
    if (this.edges[vertex1] && this.edges[vertex1][vertex2] != undefined)
        this.edges[vertex1][vertex2] = undefined;

    if (this.edges[vertex2] && this.edges[vertex2][vertex1] != undefined)
        this.edges[vertex2][vertex1] = undefined;
}

UniDirectedGraph.prototype.removeVertex = function (vertex) {
    for (const adjacentVertex in this.edges[vertex]) {
        this.removeEdge(adjacentVertex, vertex);
    }

    this.edges[vertex] = undefined;
}

const graph2 = new UniDirectedGraph();
graph2.addVertex(1);
graph2.addVertex(2);
graph2.addEdge(1, 2, 1);
console.log(graph2.edges); // 1: {2: 0}, 2: {1: 0}

graph2.addVertex(3);
graph2.addVertex(4);
graph2.addVertex(5);
graph2.addEdge(2, 3, 8);
graph2.addEdge(3, 4, 10);
graph2.addEdge(4, 5, 100);
graph2.addEdge(1, 5, 88);

graph2.removeVertex(5);
graph2.removeVertex(1);
graph2.removeEdge(2, 3);

