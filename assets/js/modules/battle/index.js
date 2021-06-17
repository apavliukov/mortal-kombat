import utils from '../utils';
import rules from '../rules';

const enemyAttack = () => {
  const hit = getRandomAttackPosition();
  const defence = getRandomAttackPosition();

  return makeAttackObject(hit, defence);
};

const playerAttack = (formValues) => {
  const hit = formValues.hit !== undefined ? formValues.hit : 0;
  const defence = formValues.defence !== undefined ? formValues.defence : 0;

  return makeAttackObject(hit, defence);
};

const getRandomAttackPosition = () => {
  const randomIndex = utils.generateRandomNumber(0, rules.ATTACK.length - 1);

  return rules.ATTACK[randomIndex];
};

const makeAttackObject = (hit, defence) => {
  const hitValue = rules.HIT[hit] ? utils.generateRandomNumber(1, rules.HIT[hit]) : 0;

  return {
    value: hitValue,
    hit,
    defence
  };
};

function handlePlayersAttack(chat, players, formValues) {
  const { player1, player2 } = players;
  const playerAttackObject = playerAttack(formValues);
  const enemyAttackObject = enemyAttack();

  if (playerAttackObject.hit !== enemyAttackObject.defence) {
    player1.changeState(rules.PLAYER_STATES.attacker);
    player2.changeState(rules.PLAYER_STATES.defender).takeDamage(playerAttackObject.value);
    chat.addLog('hit', players, playerAttackObject.value);
  } else {
    chat.addLog('defence', players);
  }

  if (enemyAttackObject.hit !== playerAttackObject.defence) {
    player2.changeState(rules.PLAYER_STATES.attacker);
    player1.changeState(rules.PLAYER_STATES.defender).takeDamage(enemyAttackObject.value);
    chat.addLog('hit', players, enemyAttackObject.value);
  } else {
    chat.addLog('defence', players);
  }
}

export default { handlePlayersAttack };

