import { appendChild, removeChild, createElement, qs, setInitialFormValues, isRequiredFieldNotEmpty } from './helpers';

export class View {

  constructor() {
    this.addButton = this.getAddButton();
    this.saveButton = this.getSaveButton();
    this.cancelButton = this.getCancelButton();

    this.HIDDEN_STATE_STRING = 'hidden';

    this.initialFormState = setInitialFormValues();
    this.formHook = qs('#form');
    this.addressListHook = qs('#list-wrapper');
    this.buttonsWrapper = qs('#form-buttons');
  };

  createButton = (type, actionType, text) => {
    const button = document.createElement('button');
    button.setAttribute('type', type);
    button.setAttribute('name', actionType);
    button.classList.add('btn', actionType);
    button.textContent = text;
    return button;
  };

  showEditButtons() {
    this.addButton.classList.add(this.HIDDEN_STATE_STRING);
    this.saveButton.classList.remove(this.HIDDEN_STATE_STRING);
    this.cancelButton.classList.remove(this.HIDDEN_STATE_STRING);
  };

  hideEditButtons() {
    this.addButton.classList.remove(this.HIDDEN_STATE_STRING);
    this.saveButton.classList.add(this.HIDDEN_STATE_STRING);
    this.cancelButton.classList.add(this.HIDDEN_STATE_STRING);
  };

  getAddButton() {
    const addButton = qs('#add-button');
    return addButton;
  };

  getSaveButton() {
    const saveButton = qs('#save-button');
    return saveButton;
  };

  getCancelButton() {
    const cancelButton = qs('#cancel-button');
    return cancelButton;
  };

  getAddressRoot(e) {
    const root = e.target.parentNode.parentNode
    return root;
  };

  getId(e) {
    e.preventDefault();
    const root = this.getAddressRoot(e);
    const id = root.dataset.id;
    return id;
  };

  addNewAddress(newAddress) {
    const listItem = this.createListItem(newAddress);
    this.fillFormInputs(this.initialFormState);
    appendChild(this.addressListHook, listItem);
  }

  bindAddAddress(handler) {
    this.formHook.addEventListener('click', e => {
      e.preventDefault();
      if (e.target.name === 'add' && isRequiredFieldNotEmpty(this.formHook)) {
        const inputValues = this.getFormInputsValues();
        handler(inputValues);
      };
    });
  };

  bindRemoveAddress(handler) {
    this.addressListHook.addEventListener('click', e => {
      e.preventDefault();
      this.removeListItem(e);
      if (e.target.name === 'remove') {
        const id = this.getId(e);
        handler(id);
      };
    });
  };

  editAddress(addressConfig) {
    this.fillFormInputs(addressConfig);
    this.showEditButtons();
  };

  bindEditAddress(handler) {
    return this.addressListHook.addEventListener('click', e => {
      e.preventDefault();
      if (e.target.name === 'edit') {
        const id = this.getId(e);
        return handler(id);
      };
    });
  };

  updateAddress(editedData) {
    this.hideEditButtons();
    this.clearAddressList();
    this.fillFormInputs(this.initialFormState);
    this.showList(editedData);
  };

  bindUpdateAddress(handler) {
    this.formHook.addEventListener('click', e => {
      e.preventDefault();
      if (e.target.name === 'save' && isRequiredFieldNotEmpty(this.formHook)) {
        const inputValues = this.getFormInputsValues();
        handler(inputValues);
      };
    });
  };

  cancelEditAddress(addressList) {
    this.hideEditButtons();
    this.clearAddressList();
    this.fillFormInputs(this.initialFormState);
    this.showList(addressList);
  };

  bindCancelEditAddress(handler) {
    this.formHook.addEventListener('click', e => {
      e.preventDefault();
      if (e.target.name === 'cancel' && isRequiredFieldNotEmpty(this.formHook)) {
        handler();
      };
    });
  };

  createListItem(addressData) {
    const listItemWrapper = createElement('li');
    listItemWrapper.classList.add('list-item-wrapper');
    listItemWrapper.setAttribute('data-id', addressData.id);
    const listItem = createElement('p');
    listItem.classList.add('list-item', 'name');
    listItem.textContent = addressData.firstName + ' ' + addressData.lastName;
    const addressSection = createElement('p');
    addressSection.classList.add('list-item', 'address')
    addressSection.textContent = `
      ${addressData.street} ${addressData.streetNo}, 
      ${addressData.postalCode} ${addressData.town}
    `;
    const contactWrapper = createElement('div');
    contactWrapper.classList.add('contact-wrapper');
    const phone = createElement('span');
    phone.classList.add('list-item', 'phone');
    phone.textContent = addressData.phoneNo;
    const email = createElement('span');
    email.classList.add('list-item', 'email');
    email.textContent = addressData.email;
    addressData.phoneNo ? appendChild(contactWrapper, phone) : false;
    addressData.email ? appendChild(contactWrapper, email) : false;
    const buttonsWrapper = createElement('form');
    buttonsWrapper.classList.add('buttons-wrapper');
    const editButton = this.createButton('submit', 'edit', '');
    appendChild(buttonsWrapper, editButton);
    const removeButton = this.createButton('submit', 'remove', '');
    appendChild(buttonsWrapper, removeButton);
    appendChild(listItemWrapper, listItem);
    appendChild(listItemWrapper, addressSection);
    appendChild(listItemWrapper, contactWrapper);
    appendChild(listItemWrapper, buttonsWrapper);
    return listItemWrapper;
  };

  showList(addressList) {
    this.fillFormInputs(this.initialFormState);
    addressList.map(addressItem => {
      const address = this.createListItem(addressItem);
      appendChild(this.addressListHook, address);
    });
  };

  removeListItem(e) {
    e.preventDefault();
    const addressRoot = this.getAddressRoot(e);
    removeChild(this.addressListHook, addressRoot);
  };

  clearAddressList() {
    return this.addressListHook.innerHTML = '';
  };

  getFormInputsValues() {
    let addressConfig = {};
    [...document.forms[0]]
      .map(el => el.tagName === 'INPUT' 
        ? addressConfig = { ...addressConfig, [el.name]: el.value }
        : el
      );
    return addressConfig;
  };

  fillFormInputs(addressConfig) {
    return [...this.formHook.children].map(el => {
      if (el.lastChild.tagName === 'INPUT') {
        return el.lastChild.value = addressConfig[el.lastChild.name]
      };
    });
  };

  viewInit(addressList) {
    this.fillFormInputs(this.initialFormState);
    this.hideEditButtons();
    this.showList(addressList);
  };
};