const STATUSES = {
  start: 'start',
  running: 'running',
  winner: 'winner',
  draw: 'draw',
};
const PLAYER_STATES = {
  attacker: 'attacker',
  defender: 'defender',
  winner: 'winner',
  loser: 'loser',
};

const FILENAME_FIGHTER_SELECTOR = 'index.html';
const FILENAME_BATTLE = 'battle.html';

const PLAYER_FIGHTER_STORAGE_KEY = 'player1';

export default { STATUSES, PLAYER_STATES, FILENAME_BATTLE, FILENAME_FIGHTER_SELECTOR, PLAYER_FIGHTER_STORAGE_KEY };