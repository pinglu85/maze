export default function resetCellsIsVisitingState(...cells) {
  cells.forEach((cell) => {
    cell.isVisiting = false;
  });
}
