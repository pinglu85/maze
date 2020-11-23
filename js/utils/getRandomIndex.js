export default function getRandomIndex(arrLength) {
  if (arrLength === 0) {
    return null;
  }
  if (arrLength === 1) {
    return 0;
  }
  return Math.floor(Math.random() * arrLength);
}
