import Game from './modules/game';

document.addEventListener('DOMContentLoaded', async () => {
  const game = new Game();

  await game.start();
});