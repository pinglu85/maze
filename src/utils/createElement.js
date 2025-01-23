function createElement(type, props, ...children) {
  let _children = children;

  if (children.some((child) => Array.isArray(child))) {
    _children = children.flat();
  }

  if (typeof type === "function") {
    return type({ children, ...props });
  }

  return {
    type,
    props: {
      ...props,
      children: _children,
    },
  };
}

export default createElement;
