import utils from '../utils';
import rules from '../rules';

const LABEL_STATUS_DRAW = 'draw';

const makePlayerElement = ({ name, hp, img, selector }) => {
  const $playerContainer = utils.createDOMElement('div', `${selector.replace('.', '')}`);
  const $progressBar = utils.createDOMElement('div', 'progressbar');
  const $playerLife = utils.createDOMElement('div', 'life');
  const $playerName = utils.createDOMElement('div', 'name');
  const $character = utils.createDOMElement('div', 'character');
  const $playerImage = utils.createDOMElement('img');

  $playerImage.src = img;
  $playerName.innerText = name;
  $playerLife.style.width = `${hp}%`;

  $progressBar.appendChild($playerLife);
  $progressBar.appendChild($playerName);
  $character.appendChild($playerImage);
  $playerContainer.appendChild($progressBar);
  $playerContainer.appendChild($character);

  return $playerContainer;
};

const makeReloadButton = () => {
  const $buttonContainer = utils.createDOMElement('div', 'reloadWrap');
  const $button = utils.createDOMElement('button', 'button');

  $button.innerText = 'Restart';
  $button.setAttribute('data-action', 'game-reload');

  $button.addEventListener('click', function () {
    window.location.reload();
  });

  $buttonContainer.appendChild($button);

  return $buttonContainer;
};

const makeGameStatusLabelElement = (text) => {
  const $statusLabel = utils.createDOMElement('div', 'loseTitle');

  $statusLabel.innerText = text;

  return $statusLabel;
};

const makePlayerWinsLabel = ({ name }) => makeGameStatusLabelElement(`${name} wins!`);

const makeDrawLabel = () => makeGameStatusLabelElement(LABEL_STATUS_DRAW);

const makeGameStatusLabel = ({ status, winner }) => {
  let $gameResultLabel = '';

  if (status === rules.STATUSES.draw) {
    $gameResultLabel = makeDrawLabel();
  } else {
    $gameResultLabel = makePlayerWinsLabel(winner);
  }

  return $gameResultLabel;
};

export default { makePlayerElement, makeReloadButton, makeGameStatusLabel };