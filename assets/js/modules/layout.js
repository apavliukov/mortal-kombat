import utils from './utils.js';
import rules from './rules.js';

const LABEL_STATUS_DRAW = 'draw';

function createPlayer(playerObject) {
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
}

function drawArena($container, players) {
  for (let player of players) {
    $container.appendChild(createPlayer(player));
  }
}

function makeReloadButton() {
  const $buttonContainer = utils.createDOMElement('div', 'reloadWrap');
  const $button = utils.createDOMElement('button', 'button');

  $button.innerText = 'Restart';
  $button.setAttribute('data-action', 'game-reload');

  $button.addEventListener('click', function () {
    window.location.reload();
  });

  $buttonContainer.appendChild($button);

  return $buttonContainer;
}

function showReloadButton($container) {
  $container.appendChild(makeReloadButton());
}

function makeGameStatusLabelElement(text) {
  const $statusLabel = utils.createDOMElement('div', 'loseTitle');

  $statusLabel.innerText = text;

  return $statusLabel;
}

function makePlayerWinsLabel(playerObject) {
  return makeGameStatusLabelElement(`${playerObject.name} wins!`);
}

function makeDrawLabel() {
  return makeGameStatusLabelElement(LABEL_STATUS_DRAW);
}

function makeGameStatusLabel(gameObject) {
  let $gameResultLabel = '';

  if (gameObject.status === rules.STATUSES.draw) {
    $gameResultLabel = makeDrawLabel();
  } else {
    $gameResultLabel = makePlayerWinsLabel(gameObject.winner);
  }

  return $gameResultLabel;
}

function showGameStatusLabel($container, gameObject) {
  const $gameResultLabel = makeGameStatusLabel(gameObject);

  $container.appendChild($gameResultLabel);
}

export default { drawArena, showReloadButton, showGameStatusLabel };