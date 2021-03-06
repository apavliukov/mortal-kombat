class Player {
  constructor(props) {
    this.number = props.number;
    this.name = props.name;
    this.hp = 100;
    this.img = props.img;
    this.weapon = props.weapon;
    this.selector = `.player${this.number}`;
    this.state = null;
    this.roundAttack = null;
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

  changeRoundAttack = (attackObject) => {
    this.roundAttack = attackObject;

    return this;
  };
}

export default Player;