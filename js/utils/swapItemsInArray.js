export default function swapItemsInArray(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}
