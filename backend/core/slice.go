package core

// sliceContains checks if a slice contains a specific string element.
func SliceContains(slice []string, item string) bool {
	for _, element := range slice {
		if element == item {
			return true
		}
	}
	return false
}
