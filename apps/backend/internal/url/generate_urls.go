package url

import (
	"encoding/hex"
	"math/rand"
	"strconv"
)

// 33 - 126 printable ascii
// 48 - 57 numbers
// 65 - 90 uppercase
// 97 - 122 lowercase
const PRINTABLE_ASCII_COUNT = 57 - 48 + 90 - 65 + 122 - 97

func generatePrintableArray() []int {
	arr := make([]int, PRINTABLE_ASCII_COUNT+3)
	printableRanges := [3][2]int{{48, 57}, {65, 90}, {97, 122}}
	i := 0
	for _, v := range printableRanges {
		for j := v[0]; j <= v[1]; j++ {
			arr[i] = j
			i++
		}
	}

	return arr
}

func cartesianProduct(sets [][]int) []string {
	var permutations []string
	permutations = append(permutations, "")

	for i := 0; i < len(sets); i++ {
		var tmp []string
		for j := 0; j < len(permutations); j++ {
			for k := 0; k < len(sets[i]); k++ {
				var result string
				result = permutations[j]
				char, err := hex.DecodeString(intToHex(sets[i][k]))
				if err != nil {
					panic(err)
				}

				result += string(char)
				tmp = append(tmp, result)
			}
		}

		permutations = tmp
	}

	return permutations
}

func intToHex(n int) string {
	buf := []byte{'0', '0', '0', 3 + 4: 0}
	buf = strconv.AppendUint(buf[:3], uint64(n)&0xFFFF, 16)
	return string(buf[len(buf)-2:])
}

func shuffleSlice(slice []string) []string {
	for i := range slice {
		j := rand.Intn(i + 1)
		slice[i], slice[j] = slice[j], slice[i]
	}

	return slice
}

func GenerateUniqueStrings(length int) []string {
	printables := generatePrintableArray()
	sets := make([][]int, length)

	for i := 0; i < length; i++ {
		sets[i] = printables
	}

	return shuffleSlice(cartesianProduct(sets))
}
