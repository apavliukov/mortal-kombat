function generateRandomNumber(from, to) {
  return Math.round(Math.random() * (to - from) + from);
}

function getRandomArrayItem(array) {
  if (array.length === 0) {
    return 0;
  }

  return array[generateRandomNumber(0, array.length - 1)];
}

function createDOMElement(tagName, className = '') {
  const $tag = document.createElement(tagName);

  if (className) {
    $tag.classList.add(className);
  }

  return $tag;
}

function getFormValues($form) {
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
}

function resetFormValues($form) {
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
}

function disableFormFields($form) {
  for (let $field of $form) {
    setInputDisabled($field);
  }
}

function setInputDisabled($input) {
  $input.disabled = true;
  $input.style.opacity = '0.5';
  $input.style.cursor = 'not-allowed';
}

function hideElement($element) {
  $element.style.display = 'none';
}

function getTimestamp(date = null) {
  const dateTimestamp = date ? date : new Date();

  return `${dateTimestamp.getHours()}:${dateTimestamp.getMinutes()}`;
}

export default {
  generateRandomNumber,
  getRandomArrayItem,
  createDOMElement,
  getTimestamp,
  getFormValues,
  resetFormValues,
  hideElement
};