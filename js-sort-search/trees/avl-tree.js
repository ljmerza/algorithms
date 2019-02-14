/**
 * AVL is a binary search tree that balances itself
 * An AVL tree keeps the BST height to a minimum
 * ensures O(log2(n)) time complexities for search, insertion, and deletion
 * 
 * 
 */

function AVLTree(value) {
    this.left = null;
    this.right = null;
 
    this.value = value;
    this.depth = 1;
}

/**
 * height of the AVL tree is based on the height of the children - calculate here
 */
AVLTree.prototype.setDepthBasedOnChildren = function(){
    if (this.node == null) this.depth = 0;
    else this.depth = 1;

    if (this.left != null) this.depth = this.left.depth + 1;
    if (this.right != null && this.depth <= this.right.depth) this.depth = this.right.depth + 1;
}