import utils from './utils.js';
import rules from './rules.js';

const LABEL_STATUS_DRAW = 'draw';

const createPlayer = (playerObject) => {
  const $playerContainer = utils.createDOMElement('div', `player${playerObject.player}`);
  const $progressBar = utils.createDOMElement('div', 'progressbar');
  const $playerLife = utils.createDOMElement('div', 'life');
  const $playerName = utils.createDOMElement('div', 'name');
  const $character = utils.createDOMElement('div', 'character');
  const $playerImage = utils.createDOMElement('img');

  $playerImage.src = playerObject.img;
  $playerName.innerText = playerObject.name ?? 'PLAYER-1';
  $playerLife.style.width = (playerObject.hp ?? 100) + '%';

  $progressBar.appendChild($playerLife);
  $progressBar.appendChild($playerName);
  $character.appendChild($playerImage);
  $playerContainer.appendChild($progressBar);
  $playerContainer.appendChild($character);

  return $playerContainer;
};

const drawArena = ($container, players) => {
  for (let player of players) {
    $container.appendChild(createPlayer(player));
  }

  return $container;
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

const appendReloadButton = ($container) => {
  $container.appendChild(makeReloadButton());

  return $container;
};

const makeGameStatusLabelElement = (text) => {
  const $statusLabel = utils.createDOMElement('div', 'loseTitle');

  $statusLabel.innerText = text;

  return $statusLabel;
};

const makePlayerWinsLabel = (playerObject) => makeGameStatusLabelElement(`${playerObject.name} wins!`);

const makeDrawLabel = () => makeGameStatusLabelElement(LABEL_STATUS_DRAW);

const makeGameStatusLabel = (gameObject) => {
  let $gameResultLabel = '';

  if (gameObject.status === rules.STATUSES.draw) {
    $gameResultLabel = makeDrawLabel();
  } else {
    $gameResultLabel = makePlayerWinsLabel(gameObject.winner);
  }

  return $gameResultLabel;
};

const appendGameStatusLabel = ($container, gameObject) => {
  const $gameResultLabel = makeGameStatusLabel(gameObject);

  $container.appendChild($gameResultLabel);

  return $container;
};

export default { drawArena, appendReloadButton, appendGameStatusLabel };