export default function createElement(type, props, ...children) {
  if (children.some((child) => Array.isArray(child))) {
    children = children.flat();
  }

  if (typeof type === 'function') {
    return type({ children, ...props });
  }

  return {
    type,
    props: {
      ...props,
      children: children,
    },
  };
}
