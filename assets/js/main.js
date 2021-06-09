const GAME_DRAW = 'draw';
const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};
const ATTACK = [
  'head',
  'body',
  'foot'
];

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
  changeHP,
  elHP,
  renderHP
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
  changeHP,
  elHP,
  renderHP
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

  handleFightFormSubmit($arenas);
}

function handleFightFormSubmit($arenas) {
  const $formFight = document.querySelector('.control');

  if (!$formFight) {
    return null;
  }

  $formFight.addEventListener('submit', function (event) {
    event.preventDefault();

    const $form = this;
    const formValues = getFormValues($form);
    const playerAttackObject = playerAttack(formValues);
    const enemyAttackObject = enemyAttack();

    handlePlayersAttack(playerAttackObject, enemyAttackObject);
    checkGameOver($form, $arenas);
    resetFormValues($form);
  });
}

function getFormValues($form) {
  const values = {};

  for (let $field of $form) {
    const fieldType = $field.type;
    const fieldName = $field.name;
    const fieldValue = $field.value;

    if (['button', 'submit'].indexOf(fieldType) > -1) {
      continue;
    }

    if (['checkbox', 'radio'].indexOf(fieldType) > -1) {
      if ($field.checked) {
        values[fieldName] = fieldValue;
      }
    } else {
      values[fieldName] = fieldValue;
    }
  }

  return values;
}

function resetFormValues($form) {
  for (let $field of $form) {
    const fieldType = $field.type;

    if (['button', 'submit'].indexOf(fieldType) > -1) {
      continue;
    }

    if (['checkbox', 'radio'].indexOf(fieldType) > -1) {
      $field.checked = false;
    } else {
      $field.value = '';
    }
  }
}

function disableFormFields($form) {
  for (let $field of $form) {
    setInputDisabled($field);
  }
}

function setInputDisabled($input) {
  $input.disabled = true;
  $input.style.opacity = '0.5';
  $input.style.cursor = 'not-allowed';
}

function getRandomAttackPosition() {
  const randomIndex = generateRandomNumber(0, ATTACK.length - 1);

  return ATTACK[randomIndex];
}

function makeAttackObject(hit, defence) {
  const hitValue = HIT[hit] ? generateRandomNumber(1, HIT[hit]) : 0;

  return {
    value: hitValue,
    hit,
    defence
  };
}

function enemyAttack() {
  const hit = getRandomAttackPosition();
  const defence = getRandomAttackPosition();

  return makeAttackObject(hit, defence);
}

function playerAttack(formValues) {
  const hit = formValues.hit !== undefined ? formValues.hit : 0;
  const defence = formValues.defence !== undefined ? formValues.defence : 0;

  return makeAttackObject(hit, defence);
}

function changePlayerHP(playerObject, attackPoints) {
  playerObject.changeHP(attackPoints);
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

function handlePlayersAttack(playerAttackObject, enemyAttackObject) {
  if (playerAttackObject.hit !== enemyAttackObject.defence) {
    changePlayerHP(player2, playerAttackObject.value);
  }

  if (enemyAttackObject.hit !== playerAttackObject.defence) {
    changePlayerHP(player1, enemyAttackObject.value);
  }
}

function checkGameOver($form, $arenas) {
  const gameWinner = checkGameWinner();

  if (!gameWinner) {
    return null;
  }

  const $gameResultLabel = gameWinner === GAME_DRAW ? makeDrawLabel() : makePlayerWinsLabel(gameWinner);

  disableFormFields($form);
  $arenas.appendChild(createReloadButton());
  $arenas.appendChild($gameResultLabel);
}

/**
 * Returns the winning player if the game is over, string if draw or false if the game continues
 */
function checkGameWinner() {
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