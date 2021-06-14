const playerImages = {
  'sub-zero': 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  'sonya-blade': 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
};
const defaultPlayerImage = playerImages['sub-zero'];

const playerObject = new Object({
  player: 1,
  name: '',
  hp: 100,
  img: defaultPlayerImage,
  weapon: [],
  attack: function () {
    console.log(`${this.name} Fight...`);
  },
  changeHP: function (points) {
    const currentHP = this.hp ?? 100;

    this.hp = currentHP >= points ? currentHP - points : 0;
  },
  elHP: function () {
    return document.querySelector(`.player${this.player} .life`);
  },
  renderHP: function () {
    const thisElHP = this.elHP();

    if (!thisElHP) {
      return null;
    }

    thisElHP.style.width = `${this.hp}%`;
  },
  takeDamage: function (points) {
    this.changeHP(points);
    this.renderHP();
  }
});

function getImageUrlByIndex(index) {
  return playerImages[index] ?? defaultPlayerImage;
}

function create(playerProperties) {
  const { number, name, imgIndex, weapon } = playerProperties;

  return Object.create(playerObject, {
    player: { value: number },
    name: { value: name },
    img: { value: getImageUrlByIndex(imgIndex) },
    weapon: { value: weapon }
  });
}

export default { playerImages, create };