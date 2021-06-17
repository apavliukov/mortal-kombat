const playerImages = {
  'sub-zero': 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  'sonya-blade': 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
};
const defaultPlayerImage = playerImages['sub-zero'];

const getImageUrlByIndex = (index) => {
  return playerImages[index] ?? defaultPlayerImage;
};

class Player {
  constructor(props) {
    this.number = props.number;
    this.name = props.name;
    this.hp = 100;
    this.img = getImageUrlByIndex(props.imgIndex);
    this.weapon = props.weapon;
    this.selector = `.player${this.number}`;
    this.state = null;
  }

  attack = () => {
    console.log(`${this.name} Fight...`);
  };

  changeHP = (points) => {
    const currentHP = this.hp ?? 100;

    this.hp = currentHP >= points ? currentHP - points : 0;

    return this;
  };

  elHP = () => document.querySelector(`${this.selector} .life`);

  renderHP = () => {
    const thisElHP = this.elHP();

    if (!thisElHP) {
      return null;
    }

    thisElHP.style.width = `${this.hp}%`;

    return this;
  };

  takeDamage = (points) => {
    this.changeHP(points);
    this.renderHP();

    return this;
  };

  changeState = (state) => {
    this.state = state;

    return this;
  };
}

export default Player;