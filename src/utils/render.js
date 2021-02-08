function render(element) {
  if (typeof element === 'string') {
    return document.createTextNode(element);
  }

  const {
    type,
    props: { children, ...attrs },
  } = element;
  let node;

  if (type === 'fragment') {
    node = document.createDocumentFragment();
  } else {
    node = document.createElement(type);
  }

  for (const attrName in attrs) {
    let attrValue = attrs[attrName];
    if (attrValue === undefined) {
      continue;
    }

    if (type === 'canvas' && attrName === 'ref') {
      const refCurrent = attrValue.current;
      refCurrent.node = node;
      refCurrent.ctx = node.getContext('2d');
      continue;
    }

    if (attrName === 'ref') {
      attrValue.current = node;
      continue;
    }

    const lowerCasedAttrName = attrName.toLowerCase();
    const isValidEvent =
      attrName.startsWith('on') && lowerCasedAttrName in window;
    if (isValidEvent) {
      const eventType = lowerCasedAttrName.slice(2);
      node.addEventListener(eventType, attrValue);
      continue;
    }

    if (attrName === 'style') {
      let styleString = '';
      for (const styleName in attrValue) {
        const snakeCasedStyleName = styleName.replace(
          /[A-Z]/,
          (match) => `-${match.toLowerCase()}`
        );
        styleString += `${snakeCasedStyleName}: ${attrValue[styleName]}; `;
      }
      attrValue = styleString;
    }

    const _attrName = attrName === 'className' ? 'class' : attrName;
    node.setAttribute(_attrName, attrValue);
  }

  for (const child of children) {
    if (typeof child === 'string' && child.startsWith('<svg')) {
      node.innerHTML = child;
      continue;
    }
    node.appendChild(render(child));
  }

  return node;
}

export default render;
