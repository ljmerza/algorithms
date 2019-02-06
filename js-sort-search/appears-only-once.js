/**
 * given a sorted array with only one selement appearing once - find that
 * element - all other elements appear twice
 * uses Divide and Conquer to split and find match
 */

const arr = [1, 1, 3, 3, 4, 5, 5, 7, 7, 8, 8]; // 4 appears once

function findOnlyOnce(arr, low, high) {

    // if low/high indexes have switch or we found match
    // then we are done so return
    if (low > high) return null;
    if (low === high) return arr[high];

    // getting pivot (middle index)
    const mid = Math.floor((high + low) / 2);

    // match current index and next index
    // else match current index and previous index
    if (mid % 2 === 0) {
        if (arr[mid] === arr[mid + 1]) return findOnlyOnce(arr, mid + 2, high);
        else return findOnlyOnce(arr, low, mid);

    } else {
        if (arr[mid] === arr[mid - 1]) return findOnlyOnce(arr, mid + 1, high);
        else return findOnlyOnce(arr, low, mid - 1)
    }

}

function findOnlyOnceHelper(arr) {
    return findOnlyOnce(arr, 0, arr.length);
}

findOnlyOnceHelper(arr);