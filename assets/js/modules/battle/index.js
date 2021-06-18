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

function handleBattleRound(chat, { player1, player2 }, formValues) {
  player1.changeRoundAttack(playerAttack(formValues));
  player2.changeRoundAttack(enemyAttack());

  handlePlayerAttack(chat, player1, player2);
  handlePlayerAttack(chat, player2, player1);
}

function handlePlayerAttack(chat, player1, player2) {
  if (player1.roundAttack.hit !== player2.roundAttack.defence) {
    player1.changeState(rules.PLAYER_STATES.attacker);
    player2.changeState(rules.PLAYER_STATES.defender).takeDamage(player1.roundAttack.value);
    chat.addLog('hit', player1, player2, player1.roundAttack.value);
  } else {
    chat.addLog('defence', player1, player2);
  }
}

export default { handleBattleRound };

