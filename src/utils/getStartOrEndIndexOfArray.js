function getStartOrEndIndexOfArray(index, arrLen) {
  switch (index) {
    case 0:
      return arrLen - 1;
    case arrLen - 1:
      return 0;
    default:
      return null;
  }
}

export default getStartOrEndIndexOfArray;
