/**
 * generate an object of words (as keys) and the number of times
 * the word occurs in a string ordered by highest to lowest
 */

function wordCount(sentence) {
    // dont count period with nothing
    let wordsArray = sentence.replace(/[.]/g, '').split(' ');


    // create hash table for word occurences
    let occurenceList = {};
    for (const currentWord of wordsArray) {
        // if doesnt exist yet then add word else increment number of times seen
        if (!occurenceList[currentWord]) occurenceList[currentWord] = 1;
        else occurenceList[currentWord]++;
    }

    // convert to array of arrays to be able to sort by number of occurences
    let occurenceArray = Object.keys(occurenceList).reduce((acc, key) => {
        acc.push([occurenceList[key], key]);
        return acc;
    }, [])

    // sort by number of occurences
    const sortComp = (a, b) => b[0] - a[0];
    occurenceArray.sort(sortComp);

    // convert back to hash with number of occurences as key and word as value
    const answerList = occurenceArray.reduce((acc, curr) => {
        acc[curr[1]] = curr[0];
        return acc;
    }, {});

    return answerList;
}

wordCount("practice makes perfect. get perfect by practice. just practice");