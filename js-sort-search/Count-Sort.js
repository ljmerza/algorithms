/**
 * Count sort can be done in O(k+n) because it does not compare values. 
 * It works only for numbers and given a certain range. Instead of sorting
 * by swapping elements, this count works by counting occurrences of each
 * element in the array. Once occurrences of each element are counted, the 
 * new array can be created using those occurrences. This sorts the data without
 * having to swap elements
 * Time Complexity: O(k+n)
 * Space Complexity: O(k)
 */

function countSort(array) {
    let hash = {};
    let countArr = [];

    // for each item in array if prop does not exist then create
    // prop and set to 1 else increment prop value that exists
    for (let i = 0; i < array.length; i++) {
        if (!hash[array[i]]) hash[array[i]] = 1;
        else hash[array[i]]++;
    }

    // now that we have a hash table of the number of occurences of each number
    // for each prop in hash add the prop as a value as many times
    // as the hash prop's value
    for (let key in hash) {
        for (let i = 0; i < hash[key]; i++) {
            countArr.push(parseInt(key));
        }
    }

    return countArr;
}

countSort([6, 1, 23, 2, 3, 2, 1, 2, 2, 3, 3, 1, 123, 123, 4, 2, 3]);