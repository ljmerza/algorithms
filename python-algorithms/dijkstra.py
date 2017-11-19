graph = {}
graph['start'] = {} # start
graph['start']['a'] = 5
graph['start']['b'] = 2

graph['a'] = {} # a
graph['a']['c'] = 4
graph['a']['d'] = 2

graph['b'] = {} # b
graph['b']['a'] = 8
graph['b']['d'] = 7

graph['c'] = {} # c
graph['c']['fin'] = 3
graph['c']['d'] = 6

graph['d'] = {} # d
graph['d']['fin'] = 1

graph['fin'] = {} # finish



infinity = float('inf')
costs = {}
costs['a'] = 5
costs['b'] = 2
costs['c'] = infinity
costs['d'] = infinity
costs['fin'] = infinity

parents = {}
parents['a'] = 'start'
parents['b'] = 'start'
parents['fin'] = None

processed = []



def find_lowest_cost_node(costs):
	lowest_cost = float('inf') # set defaults
	lowest_cost_node = None
	for node in costs: # for each node in costs
		cost = costs[node] # get node
		if cost < lowest_cost and node not in processed: # if node's cost is lower than current lowest and not in processed
			lowest_cost = cost # save that lower cost
			lowest_cost_node = node # save that lowest node
	return lowest_cost_node # return lowest node



node = find_lowest_cost_node(costs) # find inital lowest cost node from start
while node is not None: # while not after finish node
	cost = costs[node] # get the cost of the current node
	neighbors = graph[node] # get the node's neighbors
	for n in neighbors.keys(): # for each neighbor of this node
		new_cost = cost + neighbors[n] # see how much it is to go to neighbor
		if costs[n] > new_cost: # if new cost is lower than cost
			costs[n] = new_cost # replacew cost with new cost - update
			parents[n] = node # add node as parent of neighbors
	processed.append(node) # add to processed list once done
	node = find_lowest_cost_node(costs) # find next lowest find_lowest_cost_node

print(costs)
