/**
 * special type of binary tree
 * left child is smaller than parent
 * right child is bigger than parent
 * 
 * balanced binary search tree where the height is minimized
 * by having children on both the left and right sides
 * increases the time complexity of insertion, deletion, and search from O(log2(n)) to O(n).
 * 
 * height of a perfect balanced tree is log2(n)
 * while an unbalanced tree can be n in the worst case
 * 
 */

function BinarySearchTree(){
    this._root = null;
}

/**
 * insertion
 * if root empty then root becomes new node
 * while loop used to traverse BST until right condition is met
 * at each loop iteration - check if new node is greater or smaller than currentRoot
 * 
 * Time Complexity (for balanced tree): O(log2(n))
 * Time Complexity (for unbalanced trees): O(n)
 * Time complexity is dependent on the height of the binary search tree.
 */
BinarySearchTree.prototype.insert = function (value) {
    const thisNode = {left: null, right: null, value};

    // if no root then just set as root and return
    if(!this._root) {
        this._root = thisNode;
        return;
    }

    // current node we are looking at starts at root
    let currentNode = this._root;


    while(true){
        
        // if the current parent is bigger than new node value
        // we want to see if left is smaller first
        if(currentNode.value > value){

            // see if current value is smaller or bigger to see which child we go into
            if (currentNode.left != null) {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
                break;
            }

        } else if(currentNode.value < value){

            // else if node value is smaller then we want to check right child first
            if(currentNode.right != null) {
                currentNode = currentNode.right;
            } else {
                currentNode = currentNode.right;
                break;
            }
        
        } else {
            break;
        }
    }
}

/**
 * first traversing down the tree looking specifically for the node
 * When the node is found, there are three possible cases:
 *      node has no children - return null - node has been deleted now
 *      node has one child - return the existing child - child has now bubbled up and replaced the parent
 *      node has two children - either find the maximum of the left subtree or find the minimum of 
 *          the right subtree to replace that node
 * 
 * Time Complexity (for balanced tree): O(log2(n))
 * Time Complexity (for unbalanced trees): O(n)
 * Time complexity is dependent on the height of the binary search tree.
 */
BinarySearchTree.prototype.remove = function (value) {
    return deleteRecursively(this._root, value);

    function deleteRecursively(root, value){

        // if we are done searching the just return null
        if (!root) return null;

        // if value is smaller than root then search left side
        // else if value is larger than parent then search right side
        // else the value is equal to root
        if (value < root.value) deleteRecursively(root.left, value);
        else if (value > root.value) deleteRecursively(root.right, value);
        else {

            // if no childern in matching root then return null
            if(!root.left && !root.right) return null;

            // if no left then return right
            // else if no right then return left
            if (!root.left) {
                root = root.right;
            } else if (!root.right) {
                root = root.left;
            } else {

                // else we need to find the min value down this path
                // set that min value as current root then fgure out right side (bigger number)
                const temp = findMin(root.right);
                root.value = temp.value;
                root.right = deleteRecursively(root.right, temp.value);
            }

            return root;
        }

        return root;
    }

    // keeps going to the left child (smaller number) until at the end
    function findMin(root){
        while(root.left) root = root.left;
        return root;
    }
}

/**
 * Search can be performed using the property that BST node’s left child is always
 * smaller than its parent and that BST node’s right child is always greater than its parent
 *      If currentRoot is smaller, the right child is visited
 *      If currentRoot is bigger, the left child is visited
 * 
 * Time Complexity (for balanced tree): O(log2(n))
 * Time Complexity (for unbalanced trees): O(n)
 */
BinarySearchTree.prototype.findNode = function(){
    let currentRoot = this._root;
    let found = null;

    while(currentRoot){
        if (currentRoot.value > value) currentRoot = currentRoot.left;
        if (currentRoot.value < value) currentRoot = currentRoot.right;
        else {
            // else there is a match so we are done here
            found = currentRoot;
            break;
        }
    }

    return found;
}

const bst1 = new BinarySearchTree();
bst1.insert(1);
bst1.insert(3);
bst1.insert(2);
bst1.findNode(3); // found node
bst1.findNode(5); // null