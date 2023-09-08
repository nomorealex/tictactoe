function isStringEmptyOrOnlySpaces(inputString) {
  if (inputString === null || inputString.length === 0) {
    return true;
  }

  const trimmedString = inputString.trim();
  return trimmedString.length === 0;
}

export default isStringEmptyOrOnlySpaces;
