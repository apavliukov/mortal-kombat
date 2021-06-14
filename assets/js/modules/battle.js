import chat from './chat.js';
import utils from './utils.js';
import rules from './rules.js';

function handlePlayersAttack(player1, player2, formValues) {
  const playerAttackObject = playerAttack(formValues);
  const enemyAttackObject = enemyAttack();

  if (playerAttackObject.hit !== enemyAttackObject.defence) {
    player2.takeDamage(playerAttackObject.value);
    chat.addLog('hit', player1, player2, playerAttackObject.value);
  } else {
    chat.addLog('defence', player1, player2);
  }

  if (enemyAttackObject.hit !== playerAttackObject.defence) {
    player1.takeDamage(enemyAttackObject.value);
    chat.addLog('hit', player2, player1, enemyAttackObject.value);
  } else {
    chat.addLog('defence', player2, player1);
  }
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

function getRandomAttackPosition() {
  const randomIndex = utils.generateRandomNumber(0, rules.ATTACK.length - 1);

  return rules.ATTACK[randomIndex];
}

function makeAttackObject(hit, defence) {
  const hitValue = rules.HIT[hit] ? utils.generateRandomNumber(1, rules.HIT[hit]) : 0;

  return {
    value: hitValue,
    hit,
    defence
  };
}

export default { handlePlayersAttack };

