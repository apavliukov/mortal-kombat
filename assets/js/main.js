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
  }
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
  }
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

  handleArenaButtonClick($arenas);
}

function handleArenaButtonClick($arenas) {
  const $arenaButton = document.querySelector('.arenas .button');

  if (!$arenaButton) {
    return null;
  }

  $arenaButton.addEventListener('click', function () {
    const randomPlayerIndex = generateRandomNumber(0, players.length - 1);

    changePlayerHP(players[randomPlayerIndex]);

    const gameWinner = checkGameWinner();

    if (gameWinner) {
      setArenaButtonDisabled($arenaButton);
      $arenas.appendChild(makePlayerWinsLabel(gameWinner));
    }
  });
}

function setArenaButtonDisabled($arenaButton) {
  $arenaButton.disabled = true;
  $arenaButton.style.opacity = '0.5';
  $arenaButton.style.cursor = 'not-allowed';
}

function changePlayerHP(playerObject) {
  const $playerLife = document.querySelector(`.player${playerObject.player} .life`);

  if (!$playerLife) {
    return null;
  }

  const lostHP = generateRandomNumber(1, 20);
  const currentPlayerHP = playerObject.hp ?? 100;
  const updatedPlayerHP = currentPlayerHP >= lostHP ? currentPlayerHP - lostHP : 0;

  playerObject.hp = updatedPlayerHP;
  $playerLife.style.width = `${updatedPlayerHP}%`;
}

/**
 * Returns the winning player if the game is over, or null if the game continues
 */
function checkGameWinner() {
  if (player1.hp === 0) {
    return player2;
  }

  if (player2.hp === 0) {
    return player1;
  }

  return null;
}

function makePlayerWinsLabel(playerObject) {
  const $statusLabel = createDOMElement('div', 'loseTitle');

  $statusLabel.innerText = `${playerObject.name} wins!`;

  return $statusLabel;
}

document.addEventListener('DOMContentLoaded', function () {
  startGame();
});