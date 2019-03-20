/**
 * add items into heap and pop it with kth times
 * (since heap is sorted)
 * 
 * here, n is the size of the array since each .pop costs O(log2(n)), which has to be done k times
 * Time Complexity: O(klog2(n))
 * 
 * O(n) in memory is needed to store the heap array.
 * Space Complexity: O(n)
 */
const array1 = [12,3,13,4,2,40,23];

function getKthSmallestElement(array, k){
    const minH = new MinHeap();

    // add the ehole array to the heap
    for(let i=0; i < array.length; i++){
        minH.add(array[i]);
    }

    // poll the heap until we reach the kth node
    for(let i=0; i<k; i++){
        minH.poll();
    }

    // return the kth node
    return minH.poll();
}

getKthSmallestElement(array1, 2); // 3
getKthSmallestElement(array1, 1); // 2
getKthSmallestElement(array1, 7); // 40

/**
 * max heap implementation
 */

function getKthBiggestElement(array, k) {
    var maxH = new MaxHeap();
    for (var i = 0, arrayLength = array.length; i < arrayLength; i++) {
        maxH.push(array[i]);
    }
    for (var i = 1; i < k; i++) {
        maxH.pop();
    }
    return maxH.pop();
}

getKthBiggestElement(array1, 2); // 23
getKthBiggestElement(array1, 1); // 40
getKthBiggestElement(array1, 7); // 2