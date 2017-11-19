

def selection_sort(arr):
	'''
	selection sort
	find the smallest element in unsorted part of array and 
	swap with first element in unsorted array
	'''
	arr = arr[:]
	arr_length = len(arr) # get length of array

	for i in range(0,arr_length): # for each item in array
		unsorted_smallest = i # get first index in unsorted part of array
		for j in range(i+1,arr_length): # for each item in unsorted part of array
			if arr[j] < arr[unsorted_smallest]: # if an item in unsort part is smaller than first index of unsorted part
				unsorted_smallest=j # save new smallest item
		arr[i],arr[unsorted_smallest] = arr[unsorted_smallest], arr[i] # add smallest found in unsorted part of array to end of sorted part of array
	return arr


arr =[6,9,2,7,4,1,3,8,0,5]

print( 'unosrted array is {}'.format(arr) )
print( 'selection sorted array is {}'.format( selection_sort(arr) ) )


