/**
 * Mergesort works by dividing the array into subarrays until each array
 * has one element. Then, each subarray is concatenated (merged) in a sorted order 
 * To do this, the index of each array can be created to keep track of elements
 * already compared. Once one array exhausts all its elements, the rest can be appended
 * to the result array
 * Time Complexity: O(nlog2(n))
 * Space Complexity: O(n)
 */

// we will keep calling this function with halving the array until we only have one element
// for each array half -> once we go back up the recursion stack then we put the recursived
// array pieces back together here (merge them) through sorting on the while-if-else loop
function merge(leftA, rightA) {
    let results = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // going through the left array and right array (keep track on indexes on both)
    // if current left is bigger than current right then add to sorted array
    // else the current right array value is the smaller one so add to sorted array
    while (leftIndex < leftA.length && rightIndex < rightA.length) {
        if (leftA[leftIndex] < rightA[rightIndex]) results.push(leftA[leftIndex++]);
        else results.push(rightA[rightIndex++]);
    }

    let leftRemains = leftA.slice(leftIndex);
    let rightRemains = rightA.slice(rightIndex);

    return results.concat(leftRemains).concat(rightRemains);
}

function mergeSort(array) {
    // if we've gotten to the base array of 1 element then go back up recursion
    if (array.length < 2) return array;

    // split array up in half
    let midPoint = Math.floor(array.length / 2);
    let leftArray = array.slice(0, midPoint);
    let rightArray = array.slice(midPoint);

    // merge the return of the sorted left half and the sorted right half
    return merge(mergeSort(leftArray), mergeSort(rightArray));
}

mergeSort([6, 1, 23, 4, 2, 3]);