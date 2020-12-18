export default function returnPromise(fn, arg) {
  return new Promise((resolve) => {
    const result = fn(arg);
    resolve(result);
  });
}
