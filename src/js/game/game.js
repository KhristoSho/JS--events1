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

  _raiseFail() {
    const failItem = document.querySelector(".fail");
    const fail = Number(failItem.textContent) + 1;
    failItem.textContent = fail;
    if (fail === 5) {
      this.failGame();
    }
  }

  startGame() {
    this.restartGame();
    if (document.querySelector(".pool") === null) {
      this.pool.createPool(8);
    }
    this.moveGoblin();
    this.nextStep();
  }

  restartGame() {
    const scoreItem = document.querySelector(".score");
    const failItem = document.querySelector(".fail");
    scoreItem.textContent = 0;
    failItem.textContent = 0;
  }

  failGame() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.createFailWindow();
  }

  createFailWindow() {
    const window = document.querySelector(".pools");
    const windowFail = document.createElement("div");
    const restartBtn = document.createElement("button");

    restartBtn.classList.add("restart-button");
    restartBtn.textContent = "Да";
    windowFail.classList.add("window-fail");
    windowFail.textContent = `Неудача! Попробуешь еще?`;
    window.innerHTML = "";
    window.appendChild(windowFail);
    windowFail.appendChild(restartBtn);

    restartBtn.addEventListener("click", () => {
      windowFail.remove();
      this.startGame();
    });
  }

  nextStep() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.intervalId = setInterval(() => {
      this.moveGoblin();
      this._raiseFail();
    }, 1000);
  }

  moveGoblin() {
    const poolWithGoblin = this.pool.getPoolWithGoblin();

    if (!poolWithGoblin) {
      const pools = this.pool.getAllPool();
      const randomPool = pools[this.pool.getNumPool(0, 7)];
      this.goblin.putGoblin(randomPool);
      return;
    }

    const currNum = poolWithGoblin.dataset.id;
    const pools = this.pool.getAllPool();
    const poolNum = this.pool.getNumPool(0, 7, currNum);

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
