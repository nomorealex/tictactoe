const min = 0;
const max = 8;
export function chooseRandomPosition() {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
