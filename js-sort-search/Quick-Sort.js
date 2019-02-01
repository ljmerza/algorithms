/**
 * Quicksort works by obtaining a pivot and partitioning the array around it (bigger
 * elements on one side and smaller elements on the other side) until everything is
 * sorted. The ideal pivot is the median of the array since it will partition the array
 * evenly but getting the median of an unsorted array linear time to compute. Hence,
 * a pivot is typically obtained by taking the median value of the first, middle, and last
 * elements in the partition
 * quicksort works better for the RAM cache.
 * Time Complexity: O(nlog2(n)) on average, O(n^2) for worst case if bad pivot chosen
 * Space Complexity: O(log2(n))
 */
function quickSort(items) {
    return quickSortHelper(items, 0, items.length - 1);
}

function quickSortHelper(items, left, right) {
    let index;

    // if we have more than two items in current 
    // recursived array then we need to partition
    if (items.length > 1) {

        // given then current recursived array - sort them
        // down the pivot by swapping then return the index
        // of were we left off
        index = partition(items, left, right);

        // any left side of parent array t hat 
        // still has not gone through partitions then partition
        if (left < index - 1) quickSortHelper(items, left, index - 1);

        // same but for right side of parent array
        if (index < right) quickSortHelper(items, index, right);
    }

    return items;
}

function partition(array, left, right) {

    // use middle value as pivot point
    let pivot = array[Math.floor((right + left) / 2)];

    while (left <= right) {

        // move left index up to next value in array that's bigger than pivot
        while (pivot > array[left]) left++;

        // move right index up to next (to the right) value that smaller than index
        while (pivot < array[right]) right--;

        // we now have the next (from the left) value on the left that's bigger
        // than the pivot and the next (from the right side) value that's
        // smaller than the pivot

        // if the left side (of the pivot) value is smaller than
        // the right side (of the pivot) value then swap values
        // and continue down the left/right side of the recursed array
        // until the left/right indexes meet up
        if (left <= right) {
            [array[left], array[right]] = [array[right], array[left]];
            left++;
            right--;
        }
    }

    // return the index of the final left side
    return left;
}

quickSort([6, 1, 23, 4, 2, 3]);