export default function resetCellsIsVisitingState(...cells) {
  cells.forEach((cell) => {
    cell.isVisiting = false;
    cell.opacity = 0.8;
  });
}
