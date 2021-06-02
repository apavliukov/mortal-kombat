const player1 = {
  name: 'Sub-Zero',
  hp: 80,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: [
    'sword',
    'axe',
    'dagger'
  ],
  attack: function () {
    console.log(`${this.name} Fight...`);
  }
};

const player2 = {
  name: 'Sonya Blade',
  hp: 50,
  img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
  weapon: [
    'hammer',
    'knife',
    'bow'
  ],
  attack: function () {
    console.log(`${this.name} Fight...`);
  }
};

function createPlayer (playerClass, playerObject) {
  const $arenas = document.querySelector('.arenas');

  if (!$arenas) {
    return null;
  }

  const $playerContainer = document.createElement('div');
  $playerContainer.classList.add(playerClass);

  const $progressBar = document.createElement('div');
  $progressBar.classList.add('progressbar');

  const $playerLife = document.createElement('div');
  $playerLife.classList.add('life');
  $playerLife.style.width = (playerObject.hp ?? 100) + '%';

  const $playerName = document.createElement('div');
  $playerName.classList.add('name');
  $playerName.innerText = playerObject.name ?? 'PLAYER-1';

  const $character = document.createElement('div');
  $character.classList.add('character');

  const $playerImage = document.createElement('img');
  $playerImage.src = playerObject.img ?? 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif';

  $progressBar.appendChild($playerLife);
  $progressBar.appendChild($playerName);
  $character.appendChild($playerImage);
  $playerContainer.appendChild($progressBar);
  $playerContainer.appendChild($character);

  $arenas.appendChild($playerContainer);
}

document.addEventListener('DOMContentLoaded', function () {
  createPlayer('player1', player1);
  createPlayer('player2', player2);
});