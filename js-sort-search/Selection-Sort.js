/**
 * Selection sorting works by scanning the elements for the smallest 
 * element and inserting it into the current position of the array.
 * Time Complexity: O(n^2)
 * Space Complexity: O(1)
 */
function selectionSort(items) {
	let len = items.length;
	let min;

	for(let i=0;i<len;i++){
		// set current as min
		min=i;

		// check rest of array for smaller value
		for(let j=i+1;j<len;j++){
			if(items[j] < items[min]) min = j;
		}

		// if found new min then swap
		if(i != min) [items[min], items[i]] = [items[i], items[min]]
	}

	return items;
}

selectionSort([6,1,23,4,2,3]);