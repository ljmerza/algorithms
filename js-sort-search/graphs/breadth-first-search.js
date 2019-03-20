
/**
 * time complexity O(V+E)
 */
directedGraph.prototype.traverseBfs = function(vertex, fn){
    const queue = {};
    const visited = {};

    queue.push(vertex);

    while(queue.length){
        vertex = queue.shift();
        if(visited[vertex]) continue;
        
        visited[vertex] = true;
        fn(vertex);

        for(const adjacentVertex in this.edges[vertex]){
            queue.push(adjacentVertex);
        }
    }
}

digrap1.traverseBfs("B", vertex => console.log(vertex));