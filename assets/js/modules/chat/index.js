import utils from '../utils';
import rules from '../rules';
import AbstractGameElement from '../abstracts/abstract-game-element';

const LOGS = {
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
const PLAYER_PLACEHOLDERS = [
  '[player1]',
  '[player2]',
  '[playerKick]',
  '[playerDefence]',
  '[playerWins]',
  '[playerLose]',
];

class Chat extends AbstractGameElement {
  constructor(props) {
    super(props);
  }

  addLog = (logType, player1, player2, lostHP = null) => {
    if (!this.elementExists()) {
      return null;
    }

    const logString = this.prepareLogString(logType, player1, player2, lostHP);

    if (logString.length === 0) {
      return null;
    }

    this.element.insertAdjacentHTML('afterbegin', `<p>${logString}</p>`);

    return this.element;
  };

  prepareLogString = (logType, player1, player2, lostHP) => {
    const logTypeStrings = LOGS[logType];
    let logString = '';

    if (!logTypeStrings) {
      return logString;
    }

    const stringTemplate = Array.isArray(logTypeStrings) ? utils.getRandomArrayItem(logTypeStrings) : logTypeStrings;
    const logObject = { stringTemplate, player1, player2, lostHP };

    switch (logType) {
      case 'start':
        return this.prepareLogStart(logObject);
      case 'end':
        return this.prepareLogEnd(logObject);
      case 'hit':
        return this.prepareLogHit(logObject);
      case 'defence':
        return this.prepareLogDefence(logObject);
      case 'draw':
        return this.prepareLogDraw(stringTemplate);
    }

    return logString;
  };

  prepareLogStart = (logObject) => {
    let logString = '';

    logString = this.stringReplacePlayerNames(logObject);
    logString = this.stringReplaceTime(logString);

    return logString;
  };

  prepareLogEnd = (logObject) => this.stringReplacePlayerNames(logObject);

  prepareLogHit = (logObject) => {
    const { player2, lostHP } = logObject;
    const logTemplateHit = '[time] - [battleText] [lostHP] [totalHP]';
    let logString = '';

    logString = logTemplateHit.replace('[battleText]', this.stringReplacePlayerNames(logObject));
    logString = this.stringReplaceTime(logString);
    logString = this.stringReplacePlayerLostHP(logString, lostHP);
    logString = this.stringReplacePlayerTotalHP(logString, player2);

    return logString;
  };

  prepareLogDefence = (logObject) => {
    const logTemplateDefence = '[time] - [battleText]';
    let logString = '';

    logString = logTemplateDefence.replace('[battleText]', this.stringReplacePlayerNames(logObject));
    logString = this.stringReplaceTime(logString);

    return logString;
  };

  prepareLogDraw = (stringTemplate) => stringTemplate;

  stringReplaceTime = (stringTemplate) => stringTemplate.replace('[time]', utils.getTimestamp());

  stringReplacePlayerNames = (logObject) => {
    const { stringTemplate, player1, player2 } = logObject;
    const player1Aliases = ['[player1]', '[playerWins]', '[playerKick]'];
    const player2Aliases = ['[player2]', '[playerLose]', '[playerDefence]'];
    let stringTemplateModified = stringTemplate;

    for (let alias of player1Aliases) {
      stringTemplateModified = stringTemplateModified.replace(alias, player1.name);
    }

    for (let alias of player2Aliases) {
      stringTemplateModified = stringTemplateModified.replace(alias, player2.name);
    }

    return stringTemplateModified;
  };

  stringReplacePlayerLostHP = (stringTemplate, lostHP) => {
    const stringLostHP = lostHP > 0 ? `-${lostHP}` : lostHP;

    return stringTemplate.replace('[lostHP]', stringLostHP);
  };

  stringReplacePlayerTotalHP = (stringTemplate, player) => stringTemplate.replace('[totalHP]', `[${player.hp}/100]`);

  addGameStatusLog = ({ status, winner, loser }) => {
    if (status === rules.STATUSES.draw) {
      this.addLog('draw');
    } else {
      this.addLog('end', winner, loser);
    }
  };
}

export default Chat;