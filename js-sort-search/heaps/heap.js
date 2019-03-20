/**
 * parent is lways greater than any of its children
 * binary heap, an array is used to represent the heap
 * Node Index
 *      (itself) N
 *      Parent (N-1) / 2
 *      Left Child (N*2) + 1
 *      Right Child (N*2) + 2
 * 
 * When elements are added or removed, the structure of the heap must remain
 * This requires items to swap and “bubble up” to the top of the heap
 *  some items need to “bubble down” to their rightful position in order to
 *      keep the structure of the heap
 * 
 * 
 */

function Heap() {
    this.items = [];
}

Heap.prototype.swap = function (index1, index2) {
    [this.items[index1], this.items[index2]] = [this.items[index2], this.items[index1]];
}

Heap.prototype.parentIndex = function (index) {
    return Math.floor((index - 1) / 2);
}

Heap.prototype.leftChildIndex = function (index) {
    return index * 2 + 1;
}

Heap.prototype.rightChildIndex = function (index) {
    return index * 2 + 2;
}

Heap.prototype.parent = function (index) {
    this.items[this.parentIndex(index)];
}

Heap.prototype.leftChild = function (index) {
    return this.items[this.leftChildIndex(index)];
}

Heap.prototype.rightChild = function (index) {
    return this.items[this.rightChildIndex(index)];
}

Heap.prototype.peek = function () {
    return this.items[0];
}

Heap.prototype.size = function () {
    return this.items.length;
}