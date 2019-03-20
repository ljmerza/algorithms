/**
 * PRINT NODES NTH DISTANCE FROM THE ROOT
 * 
 * traverse the Bst in any way (level order was used in this example)
 * check the height for each Bst node to see whether it should be printed.
 */

 function printKthLevels(root, k){
     const arrayKth = [];
     const queue = [];

     if (!root) return;

    //  keep a queue of arrays first index is node second index is depth of node
     queue.push([root, 0]);

     while(queue.length){
        const tuple = queue.shift();
        const temp = tuple[0];
        const height = tuple[1];

        // if the current ehight of the current node is what we are looking for then print
        if (height == k) arrayKth.push(temp.value);

        // add left and right children nodes to queue if they exist
         if (temp.left) queue.push([temp.left, height+1]);
         if (temp.right) queue.push([temp.right, height+1]);
     }

    //  print everything we collected
     console.log(arrayKth);
 }


const node1 = {
    value: 1,
    left: {
        value: 0
    },
    right: {
        value: 2
    }
}

const node2 = {
    value: 1,
    left: {
        value: 0,
        left: {
            value: -1
        },
        right: {
            value: 0.5
        }
    },
    right: {
        value: 2
    }
}

const node3 = {
    value: 1,
    left: {
        value: 0
    },
    right: {
        value: 2,
        left: {
            value: 1.
        },
        right: {
            value: 3,
            left: {
                value: 3.25
            }
        }
    }
}

printKthLevels(node1, 1); // [0,2]
printKthLevels(node3, 2); // [1,3]