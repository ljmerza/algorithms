/**
 * system tracks the number of times a block is referenced in memory
 * when the cache exceeds its limit, the system deletes the item with the lowest reference frequency
 * 
 * The easiest implementation of the LFU cache is assigning a counter to every block loaded into 
 * the cache and incrementing a counter every time a reference is made to that block. When the cache 
 * exceeds its limit, the system searches for the block with the lowest counter and removes it from the cache
 */

function LfuNode(key, value) {
    this.prev = null;
    this.next = null;
    this.key = key;

    this.data = value;

    // keeps track of how many times referenced
    // so once full - purge nodes that have the least amount of references
    this.freqCount = 1;
}


/**
 * only need to add at head / remove at tail
 * or remove a certain node
 */
function LfuDoublyLinkedList() {
    this.head = new LfuNode('buffer head', null);
    this.tail = new LfuNode('buffer tail', null);

    this.head.next = this.tail;
    this.tail.prev = this.head;

    this.size = 0;
}

LfuDoublyLinkedList.prototype.insertAtHead = function(node) {
    // set current head as new node's next
    node.next = this.head.next;
    this.head.next.prev = node;

    // set current head as new node
    this.head.next = node;
    node.prev = this.head;

    this.size++;
}

LfuDoublyLinkedList.prototype.removeAtTail = function() {
    const oldTail = this.tail.prev; // save last node to return back

    // get reference to node we want to remove
    const prev = this.tail.prev;

    // from the node we want to remove - get the prev node, then set THAT node's next to tail
    prev.prev.next = this.tail;

    // set prev node of the tail to the node previous to the node we want to remove
    this.tail.prev = prev.prev;

    this.size--;
    return oldTail;
}

LfuDoublyLinkedList.prototype.removeNode = function(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;

    this.size--;
}

/**
 * two has tables keys and freq
 * freq - has keys of frequency (1 to n, n = top freq of element access)
 * each item is instance of doubly linked list class
 * @param {*} capacity 
 */
function LfuCache(capacity) {
    this.keys = {}; // stores LfuNode
    this.freq = {}; // stores LfuDoublyLinkedList

    this.capacity = capacity;

    this.minFreq = 0;
    this.size = 0;
}

/**
 * if we are caching a new element then if the cache is not full - insert into freq's double linked list that has freq=1
 *      this.freq[1] = add to this linked list
 * if that list is full then delete tail item before inserting new node
 * 
 * if element already exists and needs to be replaced - node is brought to head of it's current linked list
 * min var minFreq is incremented
 */
LfuCache.prototype.set = function (key, value) {
    let node = this.keys[key];

    // if node doesnt exist in keys then add it
    if (node == undefined) {

        // create new node and store in keys
        node = new LfuNode(key, value);
        this.keys[key] = node;

        // if we have space for node then try to add it to linked list with frequency 1
        if (this.size !== this.capacity) {

            // if linked list for frequency 1 doesnt exist then create it
            if (this.frequency[1] == undefined) 
                this.frequency[1] = new LfuDoublyLinkedList();

            // add new node and increment size of frequency 1
            this.frequency[1].insertAtHead(node);
            this.size++;

        } else {
            // else frequency 1 is full and we need to delete a node first so delete tail
            const oldTail = this.frequency[this.minFrequency].removeAtTail();
            delete this.keys[oldTail.key];

            // if we deleted frequency 1 then add it back before adding new node
            if (this.frequency[1] === undefined) 
                this.frequency[1] = new LfuDoublyLinkedList();

            this.frequency[1].insertAtHead(node);
        }

        // we added a new node so minFrequency needs to be reset to 1
        // aka new node was referenced once
        this.minFrequency = 1;

    } else {
        // else node exists so we need to get it and move it to the new linked list

        // save the old frequency of the node and increment (also update data)
        const oldFrequencyCount = node.frequencyCount;
        node.data = value;
        node.freqCount++;

        // remove node from the linked list
        this.frequency[oldFreqCount].removeNode(node);

        // if new list doesnt exist then make it now
        if (this.frequency[node.frequencyCount] === undefined) 
            this.frequency[node.frequencyCount] = new LfuDoublyLinkedList();

        // now add node to new linked list with the incremented freqCount
        this.frequency[node.frequencyCount].insertAtHead(node);

        // if the node we incremented was in the minFrequency list of all lists
        // and there's nothing left in the old list then we know the new minFrequency
        // for any node in any list is in the next freq so increment that now
        if (
            oldFrequencyCount === this.minFrequeny
            && Object.keys(this.frequency[oldFequencyCount]).size === 0
        ) {
            this.minFrequency++;

        }
    }
}

/**
 * if element doesnt exist in cache return null
 * otherwaise we increment freq for that element - item is brought to head of 
 * linked list min freq is adjusted if needed
 */
LfuCache.prototype.get = function(key) {
    const node = this.keys[key];
    if (node == undefined) return null;

    const oldFrequencyCount = node.frequencyCount;
    node.frequencyCount++;

    // remove node from old frequency list and create new one if next one doesnt exist
    // before adding the node to the next list at the head
    this.frequency[oldFrequencyCount].removeNode(node);
    if (this.frequency[node.frequencyCount] === undefined) 
        this.frequency[node.frequencyCount] = new LfuDoublyLinkedList();

    this.frequency[node.frequencyCount].insertAtHead(node);

    // if old frequency list is empty then update minFrequency
    if (
        oldFreqCount === this.minFrequency
        && Object.keys(this.frequency[oldFrequencyCount]).length === 0
    ) {
        this.minFrequency++;
    }

    return node.data;
}

const myLFU = new LfuCache(5);
myLFU.set(1, 1); // {1: 1}
myLFU.set(2, 2); // {1: 2<->1}
myLFU.set(3, 3); // {1: 3<->2<->1}
myLFU.set(4, 4); // {1: 4<->3<->2<->1}
myLFU.set(5, 5); // {1: 5<->4<->3<->2<->1}
myLFU.get(1); // returns 1, {1: 5<->4<->3<->2, 2: 1}
myLFU.get(1); // returns 1, {1: 5<->4<->3<->2, 3: 1}
myLFU.get(1); // returns 1, {1: 5<->4<->3<->2, 4: 1}
myLFU.set(6, 6); // {1: 6<->5<->4<->3, 4: 1}
myLFU.get(6); // {1: 5<->4<->3, 4: 1, 2: 6}