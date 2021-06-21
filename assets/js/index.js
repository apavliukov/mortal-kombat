import FighterSelector from './modules/fighter-selector/index.js';

document.addEventListener('DOMContentLoaded', async () => {
  const fighterSelector = new FighterSelector();

  await fighterSelector.init();
});