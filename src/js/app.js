import { Game } from "./game/game.js";

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game();
  game.startGame();
  game.setListenerOnPool();
});
