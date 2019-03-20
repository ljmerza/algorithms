

/**
 * take shortest path from one node to next
 * distance is marked infinity at first because node MAY be unreachable
 * at each traversal - shortest distance is chosen for each node
 */

 function _isEmpty(obj){
     return Object.keys(obj).length === 0;
 }

 /**
  * used to compute neighboring node with smallest distance fora given vertex
  * 
  */
 function _extractMin(Q, dist){

    // start at highest distance possible -Infinity
    let minimumDistance = Infinity;
    let nodeWithMinimumDistance = null;

    // for each edge in vertex get distance
    // if lower than current lowest then save that new lowest
    // and save the node that has the lowest route (edge to that node)
    for(const node in Q){
        if(dist[node > minimumDistance]) continue;
        minimumDistance = dist[node];
        nodeWithMinimumDistance = node;
    }

    return nodeWithMinimumDistance;
 }


/**
 * time complexity O(V^2 + E)
 * similar to BFS but requires _extractMin which is O(n)
 * algorithm can be improved with priority queue for extractMin
 *      then would make it O( log2(V) ) so then overall would be 
 *      O(E + V) * O(log2(V)) = O(E log2(V))
 * 
 * can be even more optimized by fibonacci heap which makes _extractMin const time
 */
directedGraph.prototype.dijkstra = function(source){
    const Q = {};
    const dist = {};

    // make the route to all nodes Infinity at first
    for(const vertex in this.edges){
        dist[vertex] = Infinity;
        Q[vertex] = this.edges[vertex];
    }

    // starting distance is 0 (from source to source)
    dist[source] = 0;

    // deplete the queue of nodes to process
    while(!_isEmpty(Q)){

        // get min route for current node
        const u = _extractMin(Q, dist);
        delete Q[u];

        // for each route of current node save lowest route cost
        for(const neighbor in this.edges[u]){
            const alt = dist[u] + this.edges[u][neighbor];
            
            // if shorter path found then save it
            if(alt < dist[neighbor]) dist[neighbor] = alt;
        }
    }

    return dist;
 }

const digraph1 = new directedGraph();
digraph1.addVertex("A");
digraph1.addVertex("B");
digraph1.addVertex("C");
digraph1.addVertex("D");
digraph1.addEdge("A", "B", 1);
digraph1.addEdge("B", "C", 1);
digraph1.addEdge("C", "A", 1);
digraph1.addEdge("A", "D", 1);
console.log(digraph1);
// DirectedGraph {
// V: 4,
// E: 4,
// edges: { A: { B: 1, D: 1 }, B: { C: 1 }, C: { A: 1 }, D: {} }}
digraph1.Dijkstra("A"); // { A: 0, B: 1, C: 2, D: 1 }

