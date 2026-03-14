export class Goblin {
  removeGoblin(element) {
    element.classList.remove("pool_with_goblin");
  }

  putGoblin(element) {
    element.classList.add("pool_with_goblin");
  }
}
