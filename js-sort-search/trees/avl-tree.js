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
AVLTree.prototype.setDepthBasedOnChildren = function () {
    if (this.node == null) this.depth = 0;
    else this.depth = 1;

    // if left child exists then depth is depth of left side plus root
    if (this.left != null) this.depth = this.left.depth + 1;

    // if right side exists and current depth (left+1) is smaller than depth is now
    // then depth is now right depth + 1 (right+1)
    if (this.right != null && this.depth <= this.right.depth) this.depth = this.right.depth + 1;
}

/**
 * AVL trees rotate children to maintain balance after insertion
 * trees balance to have left child less than root and right child more than root
 * 
 *  left rotation is if parent node has right child and that child has another child
 *  but parent node has not left child
 * 
 *      40                                                 45
 *     / \                                                 / \
 *        45    --->  rotate each node to left --->       40  47
 *         \
 *          47
 * 
 * left rotation: (node == original parent node)
 *      get left child and store it (original left)
 *      original left is parent of node now
 *      set node's left child to be original left child's left child
 *      set right child of original left child to be the node
 */
AVLTree.prototype.rotateLL = function () {
    const valueBefore = this.value;
    const rightBefore = this.right;

    this.value = this.left.value;

    this.right = this.left;
    this.left = this.left.left;
    this.right.left = this.right.right;

    this.right.right = rightBefore;
    this.right.value = valueBefore;

    this.right.getDepthFromChildren();
    this.getDepthFromChildren();
}

/**
 * rotate right is when node has left child with left child both with lower value
 */
AVLTree.prototype.rotateRR = function () {
    // right side is too long - rotate from the right (now to the right)
    const valueBefore = this.value;
    const leftBefore = this.left;

    this.value = this.right.value;

    this.left = this.right;
    this.right = this.right.right;
    this.left.right = this.left.left;

    this.left.left = leftBefore;
    this.left.value = valueBefore;

    this.left.getDepthFromChildren();
    this.getDepthFromChildren();
}

/**
 * double rotation
 * rotate right then left
 * 
 *      50              50               60
 *        \               \             /  \
 *         75     -->     60    -->    50   75
 *        /                 \
 *       60                  75
 *     (start)     (rotate right)   (rotate left)
 * 
 * can also rotate right then left
 */

/**
 * balancing the tree
 * check left/right children's height - if not the same then rotations needed
 * if left bigger then left rotation, if right bigger then rotate right
 */
AVLTree.prototype.balance = function () {

    // get depth of left/right children to see if we need left or right rotation
    let ldepth = this.left == null ? 0 : this.left.depth;
    let rdepth = this.right == null ? 0 : this.right.depth;

    // if left is longer than setup for rotate left
    if (ldepth > rdepth + 1) {

        // get depths from left child
        const lldepth = this.left.left == null ? 0 : this.left.left.depth;
        const lrdepth = this.left.right == null ? 0 : this.left.right.depth;

        // if left children is unbalance then rotate right first
        if (lldepth < lrdepth) this.left.rotateRR();

        // then always rotate left
        this.rotateLL();

    } else {
        // else right is bigger so do the same check for right side children
        // then rotate left if needed then always rotate right
        const rrdepth = this.right.right == null ? 0 : this.right.right.depth;
        const rldepth = this.right.left == null ? 0 : this.right.left.depth;

        if (rldepth > rrdepth) this.right.rotateLL();
        this.rotateRR();
    }

}

/**
 * insert in AVL BST same as normal BST except once inserted
 * parent must balance children and set right depth
 * 
 * Time Complexity: O(nlog2(n))
 * Space Complexity: O(nlog2(n))
 * Space complexity is from the recursive call stacks in memory
 */
AVLTree.prototype.insert = function (value) {
    let childInserted = false;

    // 
    if (value == this.value) return false;

    // if value is smaller we need to set on left side
    if (value < this.value) {

        // either in next left child if empty or recursively find where to set
        if (this.left == null) {
            this.left = new AVLTree(value);
            childInserted = true;
        } else {
            childInserted = this.left.insert(value);

            // if we inserted value (childInserted) then call balance()
            if (childInserted) this.balance();
        }

    } else {
        // else the value is bigger and we need to set on right side
        if (this.right == null) {
            this.right = new AVLTree(value);
            childInserted = true;
        } else {
            childInserted = this.right.insert(value);

            // balance if inserted
            if (childInserted) this.balance();
        }
    }

    // if we added node then we balanced tree and now need to calc new depth
    if (childInserted) this.getDepthFromChildren();
    return childInserted;
}

/**
 * AVL BST is a type of BST, and therefore the deletion function is the same.
 * adjusting depths can be done by calling getDepthFromChildren() during traversal.
 * time complexity and space complexity are both O(nlog2(n))
 */
AVLTree.prototype.remove = function () {
    return deleteRecursively(this, value);

    function deleteRecursively(root, value) {
        if (!root) return;

        if (value < root.value) {
            root.left = deleteRecursively(root.left, value);
        } else if (value > root.value) {
            root.right = deleteRecursively(root.right, value);
        } else {

            if (!root.left && !root.right) return;

            if (!root.left) {
                root = root.right;
                return root;

            } else if (!root.right) {
                root = root.left;
                return root;

            } else {
                const temp = findMin(root.right);
                root.value = temp.value;
                root.right = deleteRecursively(root.right, temp.value);
                return root;
            }
        }

        // ONLY DIFFERENCE from the BST one
        root.updateInNewLocation();
        return root;
    }

    function findMin(root) {
        while (root.left) root = root.left;
        return root;
    }
}


const avlTest = new AVLTree(1, '');
avlTest.insert(2);
avlTest.insert(3);
avlTest.insert(4);
avlTest.insert(5);
avlTest.insert(123);
avlTest.insert(203);
avlTest.insert(2222);
console.log(avlTest);