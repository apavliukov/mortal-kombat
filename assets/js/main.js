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
const logs = {
  start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
  end: [
    'Результат удара [playerWins]: [playerLose] - труп',
    '[playerLose] погиб от удара бойца [playerWins]',
    'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
  ],
  hit: [
    '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
    '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
    '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
    '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
    '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
    '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
    '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
    '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
    '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
    '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
    '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
    '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
    '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
    '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
    '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
    '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
    '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
    '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
  ],
  defence: [
    '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
    '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
    '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
    '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
    '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
    '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
    '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
    '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
  ],
  draw: 'Ничья - это тоже победа!'
};

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

function getRandomArrayItem(array) {
  if (array.length === 0) {
    return 0;
  }

  return array[generateRandomNumber(0, array.length - 1)];
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
  const $chat = document.querySelector('.chat');

  setupArena($chat);
}

function setupArena($chat) {
  const $arenas = document.querySelector('.arenas');

  if (!$arenas) {
    return null;
  }

  $arenas.appendChild(createPlayer(player1));
  $arenas.appendChild(createPlayer(player2));

  addChatLog($chat, 'start', player1, player2);
  handleFightFormSubmit($arenas, $chat);
}

function addChatLog($chat, logType, player1Object = null, player2Object = null, lostHP = null) {
  if (!$chat) {
    return null;
  }

  const logString = prepareChatLogString(logType, player1Object, player2Object, lostHP);

  if (logString.length === 0) {
    return null;
  }

  $chat.insertAdjacentHTML('afterbegin', `<p>${logString}</p>`);
}

function prepareChatLogString(logType, player1Object, player2Object, lostHP) {
  const logTypeStrings = logs[logType];
  let logString = '';

  if (!logTypeStrings) {
    return logString;
  }

  const stringTemplate = Array.isArray(logTypeStrings) ? getRandomArrayItem(logTypeStrings) : logTypeStrings;

  switch (logType) {
    case 'start':
      return prepareChatLogStart(stringTemplate, player1Object, player2Object);
    case 'end':
      return prepareChatLogEnd(stringTemplate, player1Object, player2Object);
    case 'hit':
      return prepareChatLogHit(stringTemplate, player1Object, player2Object, lostHP);
    case 'defence':
      return prepareChatLogDefence(stringTemplate, player1Object, player2Object);
    case 'draw':
      return prepareChatLogDraw(stringTemplate);
  }

  return logString;
}

function prepareChatLogStart(stringTemplate, player1Object, player2Object) {
  let logString = '';

  logString = stringReplacePlayerNames(stringTemplate, player1Object, player2Object);
  logString = stringReplaceTime(logString);

  return logString;
}

function prepareChatLogEnd(stringTemplate, player1Object, player2Object) {
  return stringReplacePlayerNames(stringTemplate, player1Object, player2Object);
}

function prepareChatLogHit(stringTemplate, player1Object, player2Object, lostHP) {
  const logTemplateHit = '[time] - [battleText] [lostHP] [totalHP]';
  let logString = '';

  logString = logTemplateHit.replace('[battleText]', stringReplacePlayerNames(stringTemplate, player1Object, player2Object));
  logString = stringReplaceTime(logString);
  logString = stringReplacePlayerLostHP(logString, lostHP);
  logString = stringReplacePlayerTotalHP(logString, player2Object);

  return logString;
}

function prepareChatLogDefence(stringTemplate, player1Object, player2Object) {
  const logTemplateDefence = '[time] - [battleText]';
  let logString = '';

  logString = logTemplateDefence.replace('[battleText]', stringReplacePlayerNames(stringTemplate, player1Object, player2Object));
  logString = stringReplaceTime(logString);

  return logString;
}

function prepareChatLogDraw(stringTemplate) {
  return stringTemplate;
}

function stringReplaceTime(stringTemplate) {
  return stringTemplate.replace('[time]', getTimestamp());
}

/*
  We consider that the first player is always a hitter/winner, the second is a defender/loser
 */
function stringReplacePlayerNames(stringTemplate, player1Object, player2Object) {
  const player1Aliases = ['[player1]', '[playerWins]', '[playerKick]'];
  const player2Aliases = ['[player2]', '[playerLose]', '[playerDefence]'];

  for (let alias of player1Aliases) {
    stringTemplate = stringTemplate.replace(alias, player1Object.name);
  }

  for (let alias of player2Aliases) {
    stringTemplate = stringTemplate.replace(alias, player2Object.name);
  }

  return stringTemplate;
}

function stringReplacePlayerLostHP(stringTemplate, lostHP) {
  const stringLostHP = lostHP > 0 ? `-${lostHP}` : lostHP;

  return stringTemplate.replace('[lostHP]', stringLostHP);
}

function stringReplacePlayerTotalHP(stringTemplate, playerObject) {
  return stringTemplate.replace('[totalHP]', `[${playerObject.hp}/100]`);
}

function getTimestamp(date = null) {
  const dateTimestamp = date ? date : new Date();

  return `${dateTimestamp.getHours()}:${dateTimestamp.getMinutes()}`;
}

function handleFightFormSubmit($arenas, $chat) {
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

    handlePlayersAttack(playerAttackObject, enemyAttackObject, $chat);
    checkGameOver($form, $arenas, $chat);
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

function handlePlayersAttack(playerAttackObject, enemyAttackObject, $chat) {
  if (playerAttackObject.hit !== enemyAttackObject.defence) {
    changePlayerHP(player2, playerAttackObject.value);
    addChatLog($chat, 'hit', player1, player2, playerAttackObject.value);
  } else {
    addChatLog($chat, 'defence', player1, player2);
  }

  if (enemyAttackObject.hit !== playerAttackObject.defence) {
    changePlayerHP(player1, enemyAttackObject.value);
    addChatLog($chat, 'hit', player2, player1, enemyAttackObject.value);
  } else {
    addChatLog($chat, 'defence', player2, player1);
  }
}

function checkGameOver($form, $arenas, $chat) {
  const gameWinner = getGameWinner();

  if (!gameWinner) {
    return null;
  }

  disableFormFields($form);
  showGameStatusLabel($arenas, gameWinner);
  addGameStatusChatLog($chat, gameWinner);
  $arenas.appendChild(createReloadButton());
}

/**
 * Returns the winning player if the game is over, string if draw or false if the game continues
 */
function getGameWinner() {
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

function getGameLoser(gameWinner) {
  for (let player of players) {
    if (player.hp === 0 && player.player !== gameWinner.player) {
      return player;
    }
  }
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

function showGameStatusLabel($arenas, gameWinner) {
  let $gameResultLabel = '';

  if (gameWinner === GAME_DRAW) {
    $gameResultLabel = makeDrawLabel();
  } else {
    $gameResultLabel = makePlayerWinsLabel(gameWinner);
  }

  if (!$gameResultLabel) {
    return null;
  }

  $arenas.appendChild($gameResultLabel);
}

function addGameStatusChatLog($chat, gameWinner) {
  if (gameWinner === GAME_DRAW) {
    addChatLog($chat, 'draw');
  } else {
    const gameLoser = getGameLoser(gameWinner);

    addChatLog($chat, 'end', gameWinner, gameLoser);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  startGame();
});