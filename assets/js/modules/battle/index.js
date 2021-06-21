import rules from '../rules';
import PlayersDamageRequest from '../requests/players-damage';

const preparePlayerAttack = (formValues) => {
  const hit = formValues.hit !== undefined ? formValues.hit : 0;
  const defence = formValues.defence !== undefined ? formValues.defence : 0;

  return {
    hit,
    defence
  };
};

const fetchPlayersDamage = async (playerAttack) => {
  const playersDamage = await (new PlayersDamageRequest(playerAttack)).fetch();

  if (typeof playersDamage !== 'object') {
    throw Error('Cannot fetch players damage');
  }

  return playersDamage;
};

const resetPlayerFighter = () => {
  localStorage.removeItem(rules.PLAYER_FIGHTER_STORAGE_KEY);
};

const storePlayerFighter = (fighter) => {
  localStorage.setItem(rules.PLAYER_FIGHTER_STORAGE_KEY, JSON.stringify(fighter));
};

const getPlayerFighter = () => JSON.parse(localStorage.getItem(rules.PLAYER_FIGHTER_STORAGE_KEY));

async function handleBattleRound(chat, { player1, player2 }, formValues) {
  const playerAttack = preparePlayerAttack(formValues);
  const playersDamage = await fetchPlayersDamage(playerAttack);

  player1.changeRoundAttack(playersDamage.player1);
  player2.changeRoundAttack(playersDamage.player2);

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

export default { handleBattleRound, resetPlayerFighter, storePlayerFighter, getPlayerFighter };

