import utils from '../utils/index.js';
import rules from '../rules/index.js';

const LABEL_STATUS_DRAW = 'draw';

const DEFAULT_AVATAR_URL = 'https://reactmarathon-api.herokuapp.com/assets/mk/avatar/11.png';

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
    utils.redirectToFile(rules.FILENAME_FIGHTER_SELECTOR);
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

const makeEmptyFighterElement = () => {
  const element = utils.createDOMElement('div', ['character', 'div11', 'disabled']);
  const img = utils.createDOMElement('img');

  img.src = DEFAULT_AVATAR_URL;

  element.appendChild(img);

  return element;
};

const makeFighterElement = (fighter) => {
  const element = utils.createDOMElement('div', ['character', `div${fighter.id}`]);
  const img = utils.createDOMElement('img');

  img.src = fighter.avatar;
  img.alt = fighter.name;

  element.appendChild(img);

  return element;
}

export default { makePlayerElement, makeReloadButton, makeGameStatusLabel, makeEmptyFighterElement, makeFighterElement };