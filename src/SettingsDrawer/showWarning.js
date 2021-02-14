import { createElement, render } from '../utils';
import Warning from './Warning';

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
