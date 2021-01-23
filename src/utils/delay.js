function delay(wait) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, wait);
  });
}

export default delay;
