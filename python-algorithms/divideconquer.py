arr = [3,7,4,9,14,76,2,18,4]
print("array is                  {}".format(arr))



def maxElement(vals, left, right):
	if left == right:
		return vals[left] # if both sides are equal then doesnt matter which one we return - return left

	mid = (left+right)/2 # get middle of array

	max1 = maxElement(vals, left, mid)
	max2 = maxElement(vals, mid+1, right)

	return max1 if max1 > max2 else max2
print("maxElement is {}".format(maxElement(arr, 0, len(arr)-1)))




def mergeSort( lrr ):
	lrr = lrr[:]
	if len(lrr) <= 1: # if list is too small then return list
		return lrr
		
	mid = len(lrr) // 2 # split list in half
	lefthalf = mergeSort(lrr[:mid]) # sort these two halves
	righthalf = mergeSort(lrr[mid:])

	xrr = []
	while len(lefthalf) !=0 and len(righthalf) != 0: # go through both half lists
		if lefthalf[0] < righthalf[0]: # compare first values of each half array
			xrr.append(lefthalf.pop(0)) # if left is lower then pop off left and add to final array
		else: # else pop right and add to final array
			xrr.append(righthalf.pop(0))

	if len(lefthalf) == 0: # if left empty then add rest of right
		xrr += righthalf
	else:  # else right empty so add rest of left
		xrr += lefthalf
	return xrr

print("mergeSort sorted array is {}".format(mergeSort(arr)))




def quickSort( lrr ):
	lrr =lrr[:] # copy array to dereference orignal array
	if len(lrr) <= 1: # if too small array then return here
		return lrr
	else:
		pivot = lrr.pop( int( len(lrr)/2 ) )  # choose a pivot - the middle element
		less, more = [], [] # sort into three parts: pivot, less than pivot, and more than pivot

		for x in lrr: # for each element in array if lower then pivot add to less array, if higher than pivot add to more array
			if x <= pivot:
				less.append(x)
			else:
				more.append(x)

		return quickSort(less) + [pivot] + quickSort(more) # now we add all lower values to pivot then higher values

print("quickSort array is        {}".format(quickSort(arr)))

print("array is                  {}".format(arr))