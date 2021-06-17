class AbstractGameElement {
  constructor(props) {
    this.selector = props.selector;
    this.element = this.getElement();
  }

  getElement = () => document.querySelector(this.selector);

  elementExists = () => this.element !== null;
}

export default AbstractGameElement;