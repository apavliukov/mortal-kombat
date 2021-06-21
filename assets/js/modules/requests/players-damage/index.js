import AbstractRequest from '../../abstracts/abstract-request/index.js';

const URL_PLAYER_FIGHT = 'https://reactmarathon-api.herokuapp.com/api/mk/player/fight';

class PlayersDamageRequest extends AbstractRequest {
  constructor(props) {
    super(props);

    this.url = URL_PLAYER_FIGHT;
    this.method = 'POST';
    this.body = {
      hit: props.hit,
      defence: props.defence
    };
  }
}

export default PlayersDamageRequest;