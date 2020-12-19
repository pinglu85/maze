export default function getOppositeIndex(index, numOfItems) {
  switch (index) {
    case 0:
      return numOfItems - 1;
    case numOfItems - 1:
      return 0;
    default:
      return null;
  }
}
