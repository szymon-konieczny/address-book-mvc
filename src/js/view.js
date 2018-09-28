import { appendChild, removeChild, createElement, qs, setInitialFormValues, isRequiredFieldNotEmpty } from './helpers';

export class View {

  constructor() {
    this.initialFormState = setInitialFormValues();
    this.formHook = this.getFormHook();
    this.addressListHook = this.getAddressListRoot();
    this.buttonsWrapper = this.getFormButtonsWrapper();
  };

  getAppRoot() {
    return qs('#address-book');
  };

  getAddressListRoot() {
    return qs('#list-wrapper');
  };

  getFormHook() {
    return qs('#form');
  };

  getRemoveAddressButton() {
    return qs('.remove');
  };

  getFormButtonsWrapper() {
    return qs('#form-buttons');
  };

  createButton = (type, actionType, text) => {
    const button = document.createElement('button');
    button.setAttribute('type', type);
    button.setAttribute('name', actionType);
    button.classList.add('btn', actionType);
    button.textContent = text;
    return button;
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

  bindAddAddress(handler) {
    this.formHook.addEventListener('click', e => {
      e.preventDefault();
      if (e.target.name === 'add' && isRequiredFieldNotEmpty(this.formHook)) {
        const listItem = this.createListItem(handler());
        appendChild(this.addressListHook, listItem);
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

  bindEditAddress(handler) {
    return this.addressListHook.addEventListener('click', e => {
      if (e.target.name === 'edit') {
        const id = this.getId(e);
        return handler(id);
      };
    });
  };

  bindSaveEditedAddress(handler) {
    this.formHook.addEventListener('click', e => {
      e.preventDefault();
      if (e.target.name === 'save' && isRequiredFieldNotEmpty(this.formHook)) {
        return handler();
      };
    });
  };

  bindCancelEditAddress(handler) {
    this.formHook.addEventListener('click', e => {
      e.preventDefault();
      if (e.target.name === 'cancel' && isRequiredFieldNotEmpty(this.formHook)) {
        return handler();
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

  removeListItem(e) {
    e.preventDefault();
    const addressRoot = this.getAddressRoot(e);
    removeChild(this.addressListHook, addressRoot);
  };

  clearAddressList() {
    return this.addressListHook.innerHTML = '';
  };

  fillFormInputs(addressConfig) {
    return [...this.formHook.children].map(el => {
      if (el.lastChild.tagName === 'INPUT') {
        switch (el.lastChild.name) {
          case 'id':
            return el.lastChild.value = addressConfig.id;
          case 'firstName':
            return el.lastChild.value = addressConfig.firstName;
          case 'lastName':
            return el.lastChild.value = addressConfig.lastName;
          case 'email':
            return el.lastChild.value = addressConfig.email;
          case 'phoneNo':
            return el.lastChild.value = addressConfig.phoneNo;
          case 'street':
            return el.lastChild.value = addressConfig.street;
          case 'streetNo':
            return el.lastChild.value = addressConfig.streetNo;
          case 'town':
            return el.lastChild.value = addressConfig.town;
          case 'postalCode':
            return el.lastChild.value = addressConfig.postalCode;
        };
      };
    });
  };
};