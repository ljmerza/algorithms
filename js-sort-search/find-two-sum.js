/**
 * do two elements in an array add up to given number?
 * Time Complexity: o(n)
 * Space Complexity: o(n)
 */
function findTwoSum(array, sum) {

    // we store the 'missing' value here so already ahve any computed
    // values while we go through the array
    let store = {};

    // if given Answer = index1 + index2
    // then index2 = Answer - index1;
    // so all we really need is store what we get for index2 for each
    // item in the array then find a matching index2
    for (let i = 0; i < array.length; i++) {

        // if the current element is the missing index2 then we found a match
        if (store[array[i]]) return true;

        // else store the index2 in the cache
        else store[sum - array[i]] = array[i];
    }

    return false;
}