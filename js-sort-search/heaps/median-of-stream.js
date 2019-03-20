/**
 * have one min-heap and one max-heap, and then retrieving the median takes only O(1)
 * For example, let’s have a stream of the following integers: 12, 2, 23, 4, 13
 */
function MedianHeap() {
    this.minHeap = new MinHeap();
    this.maxHeap = new MaxHeap();
}

MedianHeap.prototype.push = function(value) {

    if (value > this.median()) {
        this.minHeap.add(value);
    } else {
        this.maxHeap.add(value);
    }

    // Rebalancing
    if (this.minHeap.size() - this.maxHeap.size() > 1) {
        this.maxHeap.push(this.minHeap.poll());
    }
    if (this.maxHeap.size() - this.minHeap.size() > 1) {
        this.minHeap.push(this.maxHeap.poll());
    }
}

MedianHeap.prototype.median = function(){
    if(this.minHeap.size() == 0 && this.maxHeap.size() == 0)
        return Number.NEGATIVE_INFINITY;
    else if(this.minHeap.size() == this.maxHeap.size())
        return (this.minHeap.size() + this.maxHeap.maxHeapa.size()) / 2;
    else if(this.minHeap.size() > this.maxHeap.size())
        return this.minHeap.peek();
    else
        return this.maxHeap.size();
}

const medianH = new MedianHeap();
medianH.push(12);
console.log(medianH.median()); // 12
medianH.push(2);
console.log(medianH.median()); // 7 ( because 12 + 2 = 14; 14/2 = 7)
medianH.push(23);
console.log(medianH.median()); // 12
medianH.push(13);
console.log(medianH.median()); // 12.5