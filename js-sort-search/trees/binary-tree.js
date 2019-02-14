/**
 * only has two child nodes
 * binary tree always has a root element
 * 
 * traversals:
 *      pre-order: current node, left, right
 *      in-order: left, node, right
 *      post-order: left, right, node
 *      level-order: breadth first search (BFS)
 * 
 * time complexity O(n)
 */

 function BinaryTreeNode(value){
    this.value = value;
    this.left = null;
    this.right = null;
}

function BinaryTree(){
    this._root = null;
}

/**
 * recursive implementation of pre-order traversal
 * print root then recursive left, then recursive right
 */
BinaryTree.prototype.traversePreOrder = function(){
    traversePreOrderHelper(this._root);

    function traversePreOrderHelper(node){
        if(!node) return;

        console.log(node.value);
        traversePreOrderHelper(node.left);
        traversePreOrderHelper(node.right);
    }
}

/**
 * pre-order traversal (iterative) no recursion
 */
BinaryTree.prototype.traversePreOrderIterative = function(){
    // create empty stack and push to root
    const nodeStack = [];
    nodeStack.push(this._root);

    // LIFO stack - loop through and:
    //      print root
    //      push right child to stack
    //      push left child to stack
    // on new while loop iteration we print the right child, 
    // add it's children, then next iteration print left child, add children... pre-order traversal
    while(nodeStack.length){
        const node = nodeStack.pop();
        console.log(node.value);

        if(node.right) nodeStack.push(node.left);
        if(node.left) nodeStack.push(node.left);
    }
}

/**
 * recursive version of in order traversal
 */
BinaryTree.prototype.traverseInOrder = function(){
    traverseInOrderHelper(this._root);

    function traverseInOrderHelper(node){
        if(!node) return;

        traverseInOrderHelper(node.left);
        console.log(node.value);
        traverseInOrderHelper(node.right);
    }
}

/**
 * in order iterative (left, node, right)
 */
BinaryTree.prototype.traversalInOrderIterative = function(){
    const current = this._root;
    const s = [];
    let notDone = true;

    while(notDone){

        // if the current node we are in exists then add to 
        // array and make current left child
        if(current != null) {
            s.push(current);
            // make sure to add left first if it exists
            current = current.left;
        
        } else if(s.length) {
            // else we are at the end so pop out from stack, 
            // log value, current is right
            current = s.pop();

            // if left didnt get pushed then print 'node'
            console.log(current.value);

            // make sure the next to log is right
            current = current.right;

        } else {
            // if no current exists or no nodes exist 
            // in stack then we are done
            notDone = false;
        }
    }
}

/**
 * post order recursive
 */
BinaryTree.prototype.traversePostOrder = function(){
    traversePostOrderHelper(this._root);

    function traversePostOrderHelper(node){
        if (node.left) traversePostOrderHelper(node.left);
        if (node.right) traversePostOrderHelper(node.right);

        console.log(node.value);
    }
}

BinaryTree.prototype.traversePostOrderIterative = function(){
    const s1 = [];
    const s2 = [];

    // root goes first
    s1.push(this._root);

    // reorder nodes to left then right child nodes into s2
    // use s1 to save child nodes so we can pop on next iteration
    while(s1.length){
        const node = s1.pop();
        s2.push(node);

        if (node.left) s1.push(node.left);
        if (node.right) s1.push(node.right);
    }

    // now that we have the correct order in loop and log values
    while(s2.length){
        const node = s2.pop();
        console.log(node.value);
    }
}

BinaryTree.prototype.traverseLevelOrder = function(){
    let root = this._root;
    const queue = [];

    if(!root) return;
    queue.push(root);

    // FIFO stack
    while(queue.length){
        // first print parent node
        const temp = queue.shift();
        console.log(node.value);

        // then add left then right so next iteration we search next level of tree
        // breadth first -> outward search
        if (temp.left) queue.push(temp.left);
        if (temp.right) queue.push(temp.right);
    }
}