export const on = (target, type, callback, capture) => target.addEventListener(type, callback, !!capture);

export const qs = selector => document.querySelector(selector);

export const appendChild = (parent, child) => parent.appendChild(child);

export const removeChild = (parent, child) => parent.removeChild(child);

export const createElement = elementName => document.createElement(elementName);

export const isListEmpty = list => list.length <= 0 ? true : false;

export const isRequiredFieldNotEmpty = form => form.checkValidity() ? true : false;

export const setInitialFormValues = () => ({
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  phoneNo: '',
  street: '',
  streetNo: '',
  town: '',
  postalCode: ''
});