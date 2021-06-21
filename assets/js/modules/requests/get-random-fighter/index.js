import AbstractRequest from '../../abstracts/abstract-request/index.js';

const URL_RANDOM_FIGHTER = 'https://reactmarathon-api.herokuapp.com/api/mk/player/choose';

class GetRandomFighterRequest extends AbstractRequest {
  constructor(props) {
    super(props);

    this.url = URL_RANDOM_FIGHTER;
  }
}

export default GetRandomFighterRequest;