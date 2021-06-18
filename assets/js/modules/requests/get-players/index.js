import AbstractRequest from '../../abstracts/abstract-request';

const URL_ALL_PLAYERS = 'https://reactmarathon-api.herokuapp.com/api/mk/players';

class GetPlayersRequest extends AbstractRequest {
    constructor(props) {
      super({
        ...props,
        url: URL_ALL_PLAYERS
      });
    }
}

export default GetPlayersRequest;