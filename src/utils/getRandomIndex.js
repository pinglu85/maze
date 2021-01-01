export default function getRandomIndex(range) {
  if (range === 0) {
    return null;
  }
  if (range === 1) {
    return 0;
  }
  return Math.floor(Math.random() * range);
}
