const GAME_DRAW = 'draw';

const player1 = {
  player: 1,
  name: 'Sub-Zero',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: [
    'sword',
    'axe',
    'dagger'
  ],
  attack: function () {
    console.log(`${this.name} Fight...`);
  },
  changeHP: changeHP,
  elHP: elHP,
  renderHP: renderHP
};

const player2 = {
  player: 2,
  name: 'Sonya Blade',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
  weapon: [
    'hammer',
    'knife',
    'bow'
  ],
  attack: function () {
    console.log(`${this.name} Fight...`);
  },
  changeHP: changeHP,
  elHP: elHP,
  renderHP: renderHP
};

const players = [
  player1,
  player2
];

function generateRandomNumber(from, to) {
  return Math.round(Math.random() * (to - from) + from);
}

function createDOMElement(tagName, className = '') {
  const $tag = document.createElement(tagName);

  if (className) {
    $tag.classList.add(className);
  }

  return $tag;
}

function createPlayer(playerObject) {
  const $playerContainer = createDOMElement('div', `player${playerObject.player}`);
  const $progressBar = createDOMElement('div', 'progressbar');
  const $playerLife = createDOMElement('div', 'life');
  const $playerName = createDOMElement('div', 'name');
  const $character = createDOMElement('div', 'character');
  const $playerImage = createDOMElement('img');

  $playerImage.src = playerObject.img ?? 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif';
  $playerName.innerText = playerObject.name ?? 'PLAYER-1';
  $playerLife.style.width = (playerObject.hp ?? 100) + '%';

  $progressBar.appendChild($playerLife);
  $progressBar.appendChild($playerName);
  $character.appendChild($playerImage);
  $playerContainer.appendChild($progressBar);
  $playerContainer.appendChild($character);

  return $playerContainer;
}

function startGame() {
  setupArena();
}

function setupArena() {
  const $arenas = document.querySelector('.arenas');

  if (!$arenas) {
    return null;
  }

  $arenas.appendChild(createPlayer(player1));
  $arenas.appendChild(createPlayer(player2));

  handleRandomButtonClick($arenas);
}

function handleRandomButtonClick($arenas) {
  const $randomButton = document.querySelector('[data-action="attack-random"]');

  if (!$randomButton) {
    return null;
  }

  $randomButton.addEventListener('click', function () {
    changePlayerHP(player1);
    changePlayerHP(player2);

    const gameWinner = checkGameOver();

    if (gameWinner) {
      const $gameResultLabel = gameWinner === GAME_DRAW ? makeDrawLabel() : makePlayerWinsLabel(gameWinner);

      setButtonDisabled($randomButton);
      $arenas.appendChild(createReloadButton());
      $arenas.appendChild($gameResultLabel);
    }
  });
}

function setButtonDisabled($button) {
  $button.disabled = true;
  $button.style.opacity = '0.5';
  $button.style.cursor = 'not-allowed';
}

function changePlayerHP(playerObject) {
  playerObject.changeHP(generateRandomNumber(1, 20));
  playerObject.renderHP();
}

function changeHP(points) {
  const currentHP = this.hp ?? 100;

  this.hp = currentHP >= points ? currentHP - points : 0;
}

function elHP() {
  return document.querySelector(`.player${this.player} .life`);
}

function renderHP() {
  const thisElHP = this.elHP();

  if (!thisElHP) {
    return null;
  }

  thisElHP.style.width = `${this.hp}%`;
}

function createReloadButton() {
  const $buttonContainer = createDOMElement('div', 'reloadWrap');
  const $button = createDOMElement('button', 'button');

  $button.innerText = 'Restart';
  $button.setAttribute('data-action', 'game-reload');

  $button.addEventListener('click', function () {
    window.location.reload();
  });

  $buttonContainer.appendChild($button);

  return $buttonContainer;
}

/**
 * Returns the winning player if the game is over, string if draw or false if the game continues
 */
function checkGameOver() {
  if (player1.hp === 0 && player2.hp !== 0) {
    return player2;
  }

  if (player2.hp === 0 && player1.hp !== 0) {
    return player1;
  }

  if (player1.hp === 0 && player2.hp === 0) {
    return GAME_DRAW;
  }

  return false;
}

function makePlayerWinsLabel(playerObject) {
  return makeGameStatusLabel(`${playerObject.name} wins!`);
}

function makeDrawLabel() {
  return makeGameStatusLabel(GAME_DRAW);
}

function makeGameStatusLabel(text) {
  const $statusLabel = createDOMElement('div', 'loseTitle');

  $statusLabel.innerText = text;

  return $statusLabel;
}

document.addEventListener('DOMContentLoaded', function () {
  startGame();
});