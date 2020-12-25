export default function resetBtnLabel(node, text, wait = 2000) {
  setTimeout(() => {
    node.textContent = text;
  }, wait);
}
