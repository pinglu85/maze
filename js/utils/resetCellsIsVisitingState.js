export default function resetCellsIsVistingState(...cells) {
  cells.forEach((cell) => {
    cell.isVisiting = false;
  });
}
