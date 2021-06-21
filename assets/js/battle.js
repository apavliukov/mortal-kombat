import Game from './modules/game/index.js';

document.addEventListener('DOMContentLoaded', async () => {
  const game = new Game();

  await game.start();
});