import { createElement, render } from '../utils';
import Warning from '../shared/Warning';

function showWarning(rootRef, message) {
  if (!rootRef.current) {
    return;
  }

  const rootEl = rootRef.current;
  rootEl.innerHTML = '';
  const node = render(<Warning message={message} />);
  rootEl.appendChild(node);
}

export default showWarning;
