export const findNearestNonZeroValue = (arr: number[], currentIndex: number): number => {
  if (arr[currentIndex] !== 0) return arr[currentIndex]

  let leftIndex = currentIndex - 1
  let rightIndex = currentIndex + 1

  while (leftIndex >= 0 || rightIndex < arr.length) {
    if (leftIndex >= 0 && arr[leftIndex] !== 0) {
      return arr[leftIndex]
    }

    if (rightIndex < arr.length && arr[rightIndex] !== 0) {
      return arr[rightIndex]
    }
    leftIndex--
    rightIndex++
  }

  return 0
}

export const processChartData = (data: number[]): number[] => {
  return data.map((num, idx) => (num === 0 ? findNearestNonZeroValue(data, idx) : num))
}
