const min = 1;
const max = 2;

export function setupMapSymbolToPlayer(map, firstName, secondName) {
  map.clear();
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  if (randomNumber === 1) {
    map.set("X", firstName);
    map.set("O", secondName);
  } else {
    map.set("X", secondName);
    map.set("O", firstName);
  }
}

export function choosePlayerToStart() {
  let symbol = undefined;
  const randomizeNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  switch (randomizeNumber) {
    case 1:
      symbol = "X";
      break;
    case 2:
      symbol = "O";
      break;
    default:
      symbol = "X";
      break;
  }
  return symbol;
}
