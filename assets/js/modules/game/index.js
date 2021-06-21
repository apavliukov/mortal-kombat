import utils from '../utils/index.js';
import rules from '../rules/index.js';
import battle from '../battle/index.js';
import Player from '../player/index.js';
import Arena from '../arena/index.js';
import Chat from '../chat/index.js';
import GetRandomFighterRequest from '../requests/get-random-fighter/index.js';

class Game {
  constructor(props = {}) {
    this.status = rules.STATUSES.start;
    this.players = {};
    this.winner = null;
    this.loser = null;
    this.arena = null;
    this.chat = null;
  }

  init = async () => {
    await this.createPlayers();
    this.arena = new Arena({
      selector: '.arenas'
    });
    this.chat = new Chat({
      selector: '.chat'
    });

    return this;
  };

  start = async () => {
    await this.init();
    this.setupArena();

    return this;
  };

  changeStatus = (status) => {
    this.status = status;

    return this;
  };

  setWinner = (player) => {
    this.winner = player;

    return this;
  };

  setLoser = (player) => {
    this.loser = player;

    return this;
  };

  createPlayers = async () => {
    const selectedPlayer1 = battle.getPlayerFighter();

    if (!selectedPlayer1) {
      utils.redirectToFile(rules.FILENAME_FIGHTER_SELECTOR);
    }

    const randomFighter = await (new GetRandomFighterRequest()).fetch();

    if (typeof randomFighter !== 'object') {
      throw Error('Something went wrong with loading the enemy fighter');
    }

    const player1 = new Player({
      ...selectedPlayer1,
      number: 1,
      weapon: ['sword', 'axe', 'dagger'],
    });
    const player2 = new Player({
      ...randomFighter,
      number: 2,
      weapon: ['hammer', 'knife', 'bow'],
    });

    this.players = {
      player1,
      player2
    };

    battle.resetPlayerFighter();

    return this;
  };

  setupArena = () => {
    if (!this.arena.elementExists()) {
      return null;
    }

    this.arena.drawArena(this.players);
    this.chat.addLog('start', this.players.player1, this.players.player2);
    this.handleFightFormSubmit(this.arena);

    return this;
  };

  checkGameOver = ($form) => {
    this.checkGameStatus();

    if (this.isGameRunning()) {
      return false;
    }

    utils.hideElement($form);
    this.chat.addGameStatusLog(this);
    this.arena.appendGameStatusLabel(this);
    this.arena.appendReloadButton();

    return true;
  };

  /**
   * Returns the winning player if the game is over, string if draw or false if the game continues
   */
  checkGameStatus = () => {
    const { player1, player2 } = this.players;

    if (player1.hp === 0 && player2.hp !== 0) {
      this.changeStatus(rules.STATUSES.winner).setWinner(player2).setLoser(player1);
      player1.changeState(rules.PLAYER_STATES.loser);
      player2.changeState(rules.PLAYER_STATES.winner);
    }

    if (player2.hp === 0 && player1.hp !== 0) {
      this.changeStatus(rules.STATUSES.winner).setWinner(player1).setLoser(player2);
      player1.changeState(rules.PLAYER_STATES.winner);
      player2.changeState(rules.PLAYER_STATES.loser);
    }

    if (player1.hp === 0 && player2.hp === 0) {
      this.changeStatus(rules.STATUSES.draw);
    }

    return this;
  };

  isGameRunning = () => {
    return [rules.STATUSES.start, rules.STATUSES.running].indexOf(this.status) > -1;
  };

  handleFightFormSubmit = () => {
    const $formFight = document.querySelector('.control');

    if (!$formFight) {
      return null;
    }

    $formFight.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formValues = utils.getFormValues($formFight);

      await battle.handleBattleRound(this.chat, this.players, formValues);
      utils.resetFormValues($formFight);
      this.checkGameOver($formFight);
      this.changeStatus(rules.STATUSES.running);
    });

    return this;
  };
}

export default Game;