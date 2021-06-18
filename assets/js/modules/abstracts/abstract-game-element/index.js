class AbstractGameElement {
  constructor(props) {
    this.element = document.querySelector(props.selector);
  }

  elementExists = () => this.element !== null;
}

export default AbstractGameElement;