

/**
 * time complexity O(V+E)
 */
directedGraph.prototype.traverseDfs = function(vertex, fn){
    const visited = {};
    this._traverseDfs(vertex, visited, fn);
}

directedGraph.prototype._traverseDfs = function(vertex, visited, fn){
    visited[vertex] = true;
    fn(vertex);

    for(const adjacentVertex in this.edges[vertex]){
        if(visited[adjacentVertex]) continue;
        this._traverseDfs(adjacentVertex, visited, fn);
    }
}

