/**
 * Insertion sort works similarly to selection sort by searching the
 * array sequentially and moving the unsorted items into a sorted
 * sublist on the left side of the array.
 * Time Complexity: O(n^2)
 * Space Complexity: O(1)
 */
function insertionSort(items) {
    let j; // index to sorted section

    // for each unsorted item move along the sorted section from right to left
    // until the current unsorted value is not bigger than the next (to the left)
    // sorted value -> insert current unsorted value into that slot
    for (let i = 0; i < items.length; i++) {
        let value = items[i];

        // starting at the previous value that was sorted (biggest sorted value)
        // if that sorted value is bigger than the current unsorted value (value=items[i])
        // shift sorted value down one then move on to next sorted value to do
        // the same check until the next sorted value is not bigger than the 
        // current unsorted value
        for (j = i - 1; j > -1 && items[j] > value; j--) {
            items[j + 1] = items[j];
        }

        // insert unsorted value into current 'open' slot from shifting above
        items[j + 1] = value;
    }

    return items;
}

insertionSort([6, 1, 23, 4, 2, 3]);