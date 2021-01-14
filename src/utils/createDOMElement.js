export default function createDOMElement({ el, ...rest }) {
  const domEl = document.createElement(el);

  for (const key in rest) {
    if (key === 'classes') {
      domEl.classList.add(...rest[key]);
      continue;
    }

    if (key === 'eventListener') {
      const eventType = rest[key].type;
      const eventHandler = rest[key].handler;
      domEl.addEventListener(eventType, eventHandler);
      continue;
    }

    if (key === 'children') {
      for (const child of rest[key]) {
        domEl.appendChild(child);
      }
      continue;
    }

    domEl[key] = rest[key];
  }

  return domEl;
}
