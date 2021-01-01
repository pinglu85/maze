export default function getOppositeDir(dir) {
  return {
    north: 'south',
    east: 'west',
    south: 'north',
    west: 'east',
  }[dir];
}
