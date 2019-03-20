/**
 * To get a sorted array, simply call .pop() on the heap until it is empty 
 * and store the stored popped objects. This is as known as a heap sort
 * 
 * percolation takes O(log2(n)) and sorting must pop n number of elements
 *      time complexity for a heap sort is O(nlog2(n))
 * 
 * 
 */


 /**
  * Ascending-Order Sort (Min-Heap)
  */
const minHeapExample = new MinHeap();
minHeapExample.add(12);
minHeapExample.add(2);
minHeapExample.add(23);
minHeapExample.add(4);
minHeapExample.add(13);
inHeapExample.items; // [2, 4, 23, 12, 13]

console.log(minHeapExample.poll()); // 2
console.log(minHeapExample.poll()); // 4
console.log(minHeapExample.poll()); // 12
console.log(minHeapExample.poll()); // 13
console.log(minHeapExample.poll()); // 23


/**
 * Descending-Order Sort (Max-Heap)
 */
const maxHeapExample = new MaxHeap();
maxHeapExample.add(12);
maxHeapExample.add(2);
maxHeapExample.add(23);
maxHeapExample.add(4);
maxHeapExample.add(13);
maxHeapExample.items; // [23, 13, 12, 2, 4]

console.log(maxHeapExample.poll()); // 23
console.log(maxHeapExample.poll()); // 13
console.log(maxHeapExample.poll()); // 12
console.log(maxHeapExample.poll()); // 2
console.log(maxHeapExample.poll()); // 4