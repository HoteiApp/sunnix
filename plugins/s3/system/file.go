package system

import (
	"fmt"
	"os"
)

func ReadFile(path string) []byte {
	file, err := os.Open(path)
	if err != nil {
		panic(err)
	}
	defer file.Close()

	// get the file size
	fileInfo, err := file.Stat()
	if err != nil {
		panic(err)
	}
	size := fileInfo.Size()

	// create a buffer to read the file into
	buffer := make([]byte, size)

	// read the file into the buffer
	_, err = file.Read(buffer)
	if err != nil {
		panic(err)
	}
	return buffer
}

func SaveFile(buffer []byte, outName string) {
	// save the decrypted file
	err := os.WriteFile(outName, buffer, 0644)
	if err != nil {
		fmt.Println("An error occurred while saving the file")
	}
}
