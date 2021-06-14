import utils from './utils.js';
import rules from './rules.js';
import chat from './chat.js';
import layout from './layout.js';
import player from './player.js';
import battle from './battle.js';

const gameObject = {
  status: rules.STATUSES.start,
  winner: null,
  loser: null,
  setStatus: function (status) {
    this.status = status;
  },
  setWinner: function (playerObject) {
    this.winner = playerObject;
  },
  setLoser: function (playerObject) {
    this.loser = playerObject;
  },
};
const player1 = player.create({
  number: 1,
  name: 'Sub-Zero',
  imgIndex: 'sub-zero',
  weapon: ['sword', 'axe', 'dagger'],
});
const player2 = player.create({
  number: 2,
  name: 'Sonya Blade',
  imgIndex: 'sonya-blade',
  weapon: ['hammer', 'knife', 'bow'],
});
const players = [
  player1,
  player2
];

function start() {
  setupArena();
}

function setupArena() {
  const $arenas = document.querySelector('.arenas');

  if (!$arenas) {
    return null;
  }

  layout.drawArena($arenas, players);
  chat.addLog('start', player1, player2);
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
    const formValues = utils.getFormValues($form);

    battle.handlePlayersAttack(player1, player2, formValues);
    utils.resetFormValues($form);
    checkGameOver($form, $arenas);
    gameObject.setStatus(rules.STATUSES.running);
  });
}

function checkGameOver($form, $arenas) {
  checkGameStatus();

  if (isGameRunning()) {
    return false;
  }

  utils.hideElement($form);
  chat.addGameStatusLog(gameObject);
  layout.showGameStatusLabel($arenas, gameObject);
  layout.showReloadButton($arenas);

  return true;
}

/**
 * Returns the winning player if the game is over, string if draw or false if the game continues
 */
function checkGameStatus() {
  if (player1.hp === 0 && player2.hp !== 0) {
    gameObject.setStatus(rules.STATUSES.winner);
    gameObject.setWinner(player2);
    gameObject.setLoser(player1);
  }

  if (player2.hp === 0 && player1.hp !== 0) {
    gameObject.setStatus(rules.STATUSES.winner);
    gameObject.setWinner(player1);
    gameObject.setLoser(player2);
  }

  if (player1.hp === 0 && player2.hp === 0) {
    gameObject.setStatus(rules.STATUSES.draw);
  }
}

function isGameRunning() {
  return [rules.STATUSES.start, rules.STATUSES.running].indexOf(gameObject.status) > -1;
}

export default { start };