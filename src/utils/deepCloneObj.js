export default function deepCloneObj(obj) {
  const clonedObj = {};

  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      clonedObj[key] = deepCloneObj(obj[key]);
    } else {
      clonedObj[key] = obj[key];
    }
  }

  return clonedObj;
}
