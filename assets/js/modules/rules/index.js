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

export default { STATUSES, PLAYER_STATES, HIT, ATTACK };