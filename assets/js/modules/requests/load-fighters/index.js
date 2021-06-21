import AbstractRequest from '../../abstracts/abstract-request/index.js';

const URL_ALL_FIGHTERS = 'https://reactmarathon-api.herokuapp.com/api/mk/players';

class LoadFightersRequest extends AbstractRequest {
    constructor(props) {
      super(props);

      this.url = URL_ALL_FIGHTERS;
    }
}

export default LoadFightersRequest;