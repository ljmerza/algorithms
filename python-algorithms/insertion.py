# insertion sort

def insertion(arr):
	'''
	for each item in an array, you look at the current item then the item behind it
	if the current item is smaller than the one behind it then switch. go to previous item.
	you are taking the current item and pushing it back each time the item before it is smaller
	until this is not true (inner loop). then you go to the next unsorted item (outer loop) and
	keep pushing that back to the sorted position.
	'''

	arr = arr[:] # copy array
	arr_len = len(arr) # get array length

	for i in range(1, arr_len): # from 1 to length-1
		j=i # start inner loop at currently unsorted index
		while j>0 and (arr[j] < arr[j-1]): # if the array is smaller than the one before it then switch
			arr[j], arr[j-1] = arr[j-1], arr[j] # switch here
			j=j-1 # go previous index

	return arr



arr = [5,8,3,1,9,7,4,2,6]


print('unsorted array is {}'.format(arr))
print('insertion sorted array is {}'.format( insertion(arr) ))
