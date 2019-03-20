/**
 * removes oldest item first (least recently used)
 * the item replaced is the oldest accessed item
 * when item in cache is accessed i tem moves to back of the list 
 * when not found in cache - front item (oldest) is removed and new item
 *  is put back at the back
 * 
 * this keeps track of which node was used when
 * double linked link used to keep track of head (oldest data)
 * each time new data inserted, head moves up until size is exceeded - then oldest data is removed
 * 
 * Bad for temporal locality
 */

function DllNode(key, data) {
    this.key = key;
    this.data = data;

    this.next = null;
    this.prev = null;
}

function LruCache(capacity) {
    this.keys = {};
    this.capacity = capacity;

    this.head = new DllNode('', null);
    this.tail = new DllNode('', null);

    this.head.next = this.tail;
    this.tail.prev = this.head;
}

LruCache.prototype.removeNode = function (node) {
    const prev = node.prev;
    const next = node.next;
    prev.next = next;
    next.prev = prev;
}

// adds new node at tail
LruCache.prototype.addNode = function (node) {
    const realTail = this.tail.prev;
    realTail.next = node;

    this.tail.prev = node;
    node.prev = realTail;
    node.next = this.tail;
}

LruCache.prototype.get = function(key){
    const node = this.keys[key];
    if(node == undefined) return null;

    this.removeNode(node);
    this.addNode(node);
    return node.data;
}

LruCache.prototype.set = function (key, value){

    // remove node from 'old' position
    const node = this.keys[key];
    if(node) this.removeNode(node);

    // create new node and add at tail
    const newNode = new DllNode(key, value);
    this.addNode(newNode);
    this.keys[key] = newNode;

    // if we are over capacity then remove oldest node - its at the head
    if(Object.keys(this.keys).length > this.capacity){
        const realHead = this.head.next;
        this.removeNode(realHead);
        delete this.keys[realHead.key];
    }
}

const myLRU = new LruCache(5);

myLRU.set(1, 1); // 1
myLRU.set(2, 2); // 1 <-> 2
myLRU.set(3, 3); // 1 <-> 2 <-> 3
myLRU.set(4, 4); // 1 <-> 2 <-> 3 <-> 4
myLRU.set(5, 5); // 1 <-> 2 <-> 3 <-> 4 <-> 5

myLRU.get(1); // 2 <-> 3 <-> 4 <-> 5 <-> 1
myLRU.get(2); // 3 <-> 4 <-> 5 <-> 1 <-> 2

myLRU.set(6, 6); // 4 <-> 5 <-> 1 <-> 2 <-> 6
myLRU.set(7, 7); // 5 <-> 1 <-> 2 <-> 6 <-> 7
myLRU.set(8, 8); // 1 <-> 2 <-> 6 <-> 7 <-> 8