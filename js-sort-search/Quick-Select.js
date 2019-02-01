/**
 * Quickselect is a selection algorithm to find the kth smallest element in an unordered list.
 * Quickselect uses the same approach as a quicksort algorithm. A pivot is chosen, and the
 * array is partitioned. Instead of recursing both sides like quicksort, however, it recurses
 * only the side for the element. 
 * Time Complexity: O(n)
 */

let array = [1, 3, 3, -2, 3, 14, 7, 8, 1, 2, 2];

// from quicksort
function partition(array, left, right) {
    let pivot = array[Math.floor((right + left) / 2)];

    while (left <= right) {
        while (pivot > array[left]) left++;
        while (pivot < array[right]) right--;

        if (left <= right) {
            [array[left], array[right]] = [array[right], array[left]];
            left++;
            right--;
        }
    }

    return left;
}

function quickSelectInPlace(A, l, h, k) {

    // partition from l to h on array A
    let p = partition(A, l, h);

    // if we partitioned up to the kth (one indexed) item then that's what we need to return
    if (p == (k - 1)) return A[p];

    // if we went too far then only partition to p-1
    else if (p > (k - 1)) return quickSelectInPlace(A, l, p - 1, k);

    // else we didnt go far enough so partition to p+1
    else return quickSelectInPlace(A, p, p + 1, k);
}

// find median of an array (sorts it first)
function medianQuickselect(array) {
    return quickSelectInPlace(array, 0, array.length - 1, Math.floor(array.length / 2));
}

// find the 5th smallest item in array after sorting it from 0 to array.length-1
quickSelectInPlace(array, 0, array.length - 1, 5); // 2
console.log(array)