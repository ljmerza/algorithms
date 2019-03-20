/**
 * A max-heap implementation differs only in the comparators
 * For bubbling down, the max-heap node swaps with one of its children if the child is greater.
 * Likewise, for bubbling up, the newest node swaps with its parent if its parent is smaller than the new node
 */
function MinHeap() {
    this.items = [];
}

// copy the general heap object prototype
MinHeap.prototype = Object.create(Heap.prototype);

MinHeap.prototype.bubbleDown = function () {
    let index = 0;

    // if we have a left child and is smaller than current node we will need to swap down
    // *** the smaller than for these and the right check below are switched for max heap implementation ***
    while (this.leftChild(index) && this.leftChild(index) < this.items[index] || this.rightChild(index) < this.items[index]) {
        let smallerIndex = this.leftChildIndex(index);

        // check right side next to see - if smaller then use right side instead of left
        if (this.rightChild(index) && this.rightChild(index) < this.items[smallerIndex])
            smallerIndex = this.rightChildIndex(index);

        // finally we swap parent node with the smaller child node
        // also set current index as new lowest node
        this.swap(smallerIndex, index);
        index = smallerIndex;
    }
}

MinHeap.prototype.bubbleUp = function () {
    let index = this.items.length - 1;

    // while we have a parent and parent is bigger than current node
    // then swap node with parent and set current index as 'parent' index
    // *** switch to less  than for max heap implemention ***
    while (this.parent(index) && this.parent(index) > this.items[index]) {
        this.swap(this.parent(index), index);
        index = this.parentIndex(index);
    }
}

MinHeap.prototype.add = function (item) {

    // add new item to end of array then sort heap
    this.items[this.items.length] = item;
    this.bubbleUp();
}

MinHeap.prototype.poll = function () {

    // get root node from heap, replace that node with node before it
    // then remove node we want
    const item = this.items[0];
    this.items[0] = this.items[this.items.length - 1];
    this.items.pop();

    // resort heap then return node we want
    this.bubbleDown();
    return item;
}


let mh1 = new MinHeap();
mh1.add(1);
mh1.add(10);
mh1.add(5);
mh1.add(100);
mh1.add(8);

console.log(mh1.poll()); // 1
console.log(mh1.poll()); // 5
console.log(mh1.poll()); // 8
console.log(mh1.poll()); // 10
console.log(mh1.poll()); // 100