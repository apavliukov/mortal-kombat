import layout from '../layout';
import AbstractGameElement from '../abstracts/abstract-game-element';

class Arena extends AbstractGameElement {
  constructor(props) {
    super(props);
  }

  drawArena = (players) => {
    for (const playerType in players) {
      if (!players.hasOwnProperty(playerType)) {
        continue;
      }

      this.appendPlayerElement(players[playerType]);
    }

    return this;
  };

  appendPlayerElement = (player) => {
    this.element.appendChild(layout.makePlayerElement(player));

    return this;
  };

  appendReloadButton = () => {
    this.element.appendChild(layout.makeReloadButton());

    return this;
  };

  appendGameStatusLabel = (game) => {
    const $gameResultLabel = layout.makeGameStatusLabel(game);

    this.element.appendChild($gameResultLabel);

    return this;
  };
}

export default Arena;