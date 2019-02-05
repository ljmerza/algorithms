
/**
 * uses binary search algorithm logic to find square root up
 * to 0.01 accuracy 
 * Time Complexity: O(log2(n))
 */
function squareRoot(number){

  // return any base cases
  if(number == 0 || number == 1) return number;
  let threshold = 0.01;

  // the sqrt is between 1 and the number given
  let lower = 1;
  let upper = number;
  let middle;

  // we split the lower/upper limits in half until we reach a mid point
  // that has a difference between the threshold since floating
  // point numbers cant be compared directly
  while(upper - lower > threshold){

    // get middle value of upper/lower limits
    middle = (upper+lower) / 2;

    // if squared of current middle is bigger than original 
    // number then we know the upper limit is too high to lower it
    if(middle*middle > number) upper = middle;
    
    // else lower limit is too low to raise it
    else lower = middle;
  }

  // once we've reached the difference threshold then 
  // the middle is the approx value we need
  return middle;
}

squareRoot(9);