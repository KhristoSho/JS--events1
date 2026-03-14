export class Pool {
  getNumPool(min, max, current = null) {
    let num;
    do {
      num = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (num == current);
    return num;
  }

  getPoolWithGoblin() {
    return document.querySelector(".pool_with_goblin");
  }

  getAllPool() {
    return document.querySelectorAll(".pool");
  }
}
