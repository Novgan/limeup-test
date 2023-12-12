export const generateRandomId = (idArray: number[]): number => {
  if (!idArray.includes(idArray.length)) return idArray.length;

  for (const iterator of idArray) {
    const nextValue = iterator + 1;
    if (!idArray.includes(nextValue)) return nextValue;
  }

  return NaN;
};
