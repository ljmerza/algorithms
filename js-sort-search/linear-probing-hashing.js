/**
 * linear probing hashing
 * To work around occurring collisions, the probing hashing technique finds the next
 * available index in the array. The linear probing technique resolves conflicts by finding
 * the next available index via incremental trials
 */

function HashTable(size) {
    this.size = size;
    this.keys = this.initArray(size);
    this.values = this.initArray(size);
    this.limit = 0;
}

HashTable.prototype.put = function (key, value) {
    if (this.limit >= this.size) throw 'hash table is full';

    // hash the key - if that computed index is full then keep moving
    // up an index until we find an empty slot
    let hashedIndex = this.hash(key);
    while (this.keys[hashedIndex] !== null) {
        hashedIndex++;
        hashedIndex = hashedIndex % this.size;
    }

    this.keys[hashedIndex] = key;
    this.values[hashedIndex] = value;
    this.limit++;
}

HashTable.prototype.get = function (key) {

    // hash key and increment index until we find matching key
    let hashedIndex = this.hash(key);
    while (this.keys[hashedIndex] !== key) {
        hashedIndex++;
        hashedIndex = hashedIndex % this.size;
    }

    return this.values[hashedIndex];
}

HashTable.prototype.hash = function (key) {
    if (!Number.isInteger(key)) throw 'must be int';
    return key % this.size;
}

HashTable.prototype.initArray = function (size) {
    return new Array(size).fill(null);
}

const exampletable = new HashTable(13);
exampletable.put(7, "hi");
exampletable.put(20, "hello");
exampletable.put(33, "sunny");
exampletable.put(46, "weather");
exampletable.put(59, "wow");
exampletable.put(72, "forty");
exampletable.put(85, "happy");
exampletable.put(98, "sad");

console.log(exampletable)