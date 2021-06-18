class AbstractRequest {
  constructor(props) {
    this.url = props.url;
    this.method = props.method ?? 'GET';
    this.headers = props.headers ?? {};
    this.body = props.body ?? {};
  }

  prepareRequestParams = () => {
    const requestParams = {
      method: this.method,
      headers: this.headers
    };

    if (['GET', 'HEAD'].indexOf(this.method) === -1) {
      requestParams.body = JSON.stringify(this.body);
    }

    return requestParams;
  }

  fetch = async () => {
    return new Promise((resolve, reject) => {
      if (!this.url) {
        reject('No URL passed');

        return null;
      }

      fetch(this.url, this.prepareRequestParams())
      .then(response => {
        if (!response.ok) {
          reject(response.statusText);
        }

        return response.json();
      })
      .then(responseData => resolve(responseData))
      .catch(error => reject(error));
    });
  };
}

export default AbstractRequest;