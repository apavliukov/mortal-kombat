import FighterSelector from './modules/fighter-selector';

document.addEventListener('DOMContentLoaded', async () => {
  const fighterSelector = new FighterSelector();

  await fighterSelector.init();
});