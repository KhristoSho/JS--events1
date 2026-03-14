import { Goblin } from "../goblin/goblin";
import { Pool } from "../pool/pool";

export class Game {
  constructor() {
    this.goblin = new Goblin();
    this.pool = new Pool();
    this.intervalId = null;
  }

  _raiseScore() {
    const scoreItem = document.querySelector(".score");
    const score = Number(scoreItem.textContent) + 1;
    scoreItem.textContent = score;
  }

  startGame() {
    this.moveGoblin();
    this.nextStep();
  }

  nextStep() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.intervalId = setInterval(() => {
      this.moveGoblin();
    }, 1500);
  }

  moveGoblin() {
    const poolWithGoblin = this.pool.getPoolWithGoblin();

    if (!poolWithGoblin) {
      const pools = this.pool.getAllPool();
      const randomPool = pools[this.pool.getNumPool(0, 3)];
      this.goblin.putGoblin(randomPool);
      return;
    }

    const currNum = poolWithGoblin.dataset.id;
    const pools = this.pool.getAllPool();
    const poolNum = this.pool.getNumPool(0, 3, currNum);

    this.goblin.removeGoblin(poolWithGoblin);
    this.goblin.putGoblin(pools[poolNum]);
  }

  setListenerOnPool() {
    const pools = this.pool.getAllPool();
    pools.forEach((pool) => {
      pool.addEventListener("click", () => {
        if (pool.classList.contains("pool_with_goblin")) {
          this._raiseScore();
          this.moveGoblin();
          this.nextStep();
        }
      });
    });
  }
}
