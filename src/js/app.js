import { Game } from "./game/game.js";

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game(16, 5);
  game.startGame();
});
