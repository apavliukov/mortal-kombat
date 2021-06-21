import utils from '../utils/index.js';
import layout from '../layout/index.js';
import battle from '../battle/index.js';
import rules from '../rules/index.js';
import LoadFightersRequest from '../requests/load-fighters/index.js';

class FighterSelector {
  constructor(props) {
    this.fightersList = null;
    this.parentContainer = document.querySelector('.parent');
    this.playerContainer = document.querySelector('.player');
    this.fighterPreviewImage = null;
  }

  init = async () => {
    battle.resetPlayerFighter();
    await this.loadFighters();
    this.drawFightersGrid();
  };

  loadFighters = async () => {
    const fighters = await (new LoadFightersRequest()).fetch();

    if (!Array.isArray(fighters) || fighters.length === 0) {
      throw Error('Something went wrong with loading the players list');
    }

    this.fightersList = fighters;

    return this;
  };

  drawFightersGrid = () => {
    this.appendEmptyFighterElement();

    this.fightersList.forEach(fighter => {
      this.appendFighterElement(fighter);
    });
  };

  appendEmptyFighterElement = () => {
    this.parentContainer.appendChild(layout.makeEmptyFighterElement());
  };

  appendFighterElement = (fighter) => {
    const element = layout.makeFighterElement(fighter);

    element.addEventListener('mousemove', () => {
      this.handleFighterOnMouseMoveEvent(fighter);
    });

    element.addEventListener('mouseout', () => {
      this.handleFighterOnMouseOutEvent();
    });

    element.addEventListener('click', () => {
      this.handleFighterOnClickEvent(element, fighter);
    });

    this.parentContainer.appendChild(element);
  };

  handleFighterOnMouseMoveEvent = (fighter) => {
    if (this.fighterPreviewImage === null) {
      const $img = utils.createDOMElement('img');

      this.fighterPreviewImage = fighter.img;
      $img.src = this.fighterPreviewImage;
      this.playerContainer.appendChild($img);
    }
  };

  handleFighterOnMouseOutEvent = () => {
    if (this.fighterPreviewImage) {
      this.fighterPreviewImage = null;
      this.playerContainer.innerHTML = '';
    }
  };

  handleFighterOnClickEvent = (element, fighter) => {
    this.setFightersGridActiveElement(element);
    battle.storePlayerFighter(fighter);

    setTimeout(() => {
      utils.redirectToFile(rules.FILENAME_BATTLE);
    }, 1000);
  };

  setFightersGridActiveElement = (element) => {
    Array.from(this.parentContainer.children).forEach(childEl => childEl.classList.remove('active'));
    element.classList.add('active');
  };
}

export default FighterSelector;