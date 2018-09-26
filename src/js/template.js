export const createButton = (type, actionType, text, callback) => {
  const button = document.createElement('button');
  button.setAttribute('type', type);
  button.setAttribute('name', actionType);
  callback ? button.addEventListener('click', callback) : false;
  button.classList.add('btn', actionType);
  button.textContent = text;
  return button;
};

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