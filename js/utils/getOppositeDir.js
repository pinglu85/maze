export default function getOppositeDir(dir) {
  return {
    north: 'south',
    west: 'east',
    south: 'north',
    east: 'west'
  }[dir];
}
