const generateRandomNumber = (from, to) => Math.round(Math.random() * (to - from) + from);

const getRandomArrayItem = (array) => {
  if (array.length === 0) {
    return 0;
  }

  return array[generateRandomNumber(0, array.length - 1)];
};

const createDOMElement = (tagName, className = '') => {
  const $tag = document.createElement(tagName);

  if (className) {
    $tag.classList.add(className);
  }

  return $tag;
};

const getFormValues = ($form) => {
  const values = {};

  for (let $field of $form) {
    const fieldType = $field.type;
    const fieldName = $field.name;
    const fieldValue = $field.value;

    if (['button', 'submit'].indexOf(fieldType) > -1) {
      continue;
    }

    if (['checkbox', 'radio'].indexOf(fieldType) > -1) {
      if ($field.checked) {
        values[fieldName] = fieldValue;
      }
    } else {
      values[fieldName] = fieldValue;
    }
  }

  return values;
};

const setInputDisabled = ($input) => {
  $input.disabled = true;
  $input.style.opacity = '0.5';
  $input.style.cursor = 'not-allowed';

  return $input;
};

const hideElement = ($element) => {
  $element.style.display = 'none';

  return $element;
};

const timestampAddLeadingZero = (time) => time < 10 ? `0${time}` : time;

const getTimestamp = (date = null) => {
  const dateTimestamp = date ? date : new Date();
  const hours = dateTimestamp.getHours();
  const minutes = dateTimestamp.getMinutes();

  return `${timestampAddLeadingZero(hours)}:${timestampAddLeadingZero(minutes)}`;
};

const resetFormValues = ($form) => {
  for (let $field of $form) {
    const fieldType = $field.type;

    if (['button', 'submit'].indexOf(fieldType) > -1) {
      continue;
    }

    if (['checkbox', 'radio'].indexOf(fieldType) > -1) {
      $field.checked = false;
    } else {
      $field.value = '';
    }
  }

  return $form;
};

const disableFormFields = ($form) => {
  for (let $field of $form) {
    setInputDisabled($field);
  }

  return $form;
};

export default {
  generateRandomNumber,
  getRandomArrayItem,
  createDOMElement,
  getTimestamp,
  getFormValues,
  resetFormValues,
  disableFormFields,
  hideElement
};