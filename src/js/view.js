import { createButton, setInitialFormValues } from './template';
import { ac, rc, ce, qs, isRequiredFieldNotEmpty } from './helpers';

export class View {

  constructor(listName) {
    this.listName = listName;
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

  createAddButton() {
    return createButton('submit', 'add', 'Add an address');
  };

  createSaveButton() {
    return createButton('submit', 'save', 'Save');
  };

  createCancelButton() {
    return createButton('reset', 'cancel', 'Cancel');
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
      // e.preventDefault();
      if (e.target.name === 'add' && isRequiredFieldNotEmpty(this.formHook)) {
        const listItem = this.createListItem(handler());
        ac(this.addressListHook, listItem);
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

  createListItem(addressData) {
    const listItemWrapper = ce('li');
    listItemWrapper.classList.add('list-item-wrapper');
    listItemWrapper.setAttribute('data-id', addressData.id);
    const listItem = ce('p');
    listItem.classList.add('list-item', 'name');
    listItem.textContent = addressData.firstName + ' ' + addressData.lastName;
    const addressSection = ce('p');
    addressSection.classList.add('list-item', 'address')
    addressSection.textContent = addressData.street + ' ' + addressData.streetNo + ', ' + addressData.postalCode + ' ' + addressData.town;
    const contactWrapper = ce('div');
    contactWrapper.classList.add('contact-wrapper');
    const phone = ce('span');
    phone.classList.add('list-item', 'phone');
    phone.textContent = addressData.phoneNo;
    const email = ce('span');
    email.classList.add('list-item', 'email');
    email.textContent = addressData.email;
    addressData.phoneNo ? ac(contactWrapper, phone) : false;
    addressData.email ? ac(contactWrapper, email) : false;
    const buttonsWrapper = ce('form');
    buttonsWrapper.classList.add('buttons-wrapper');
    const editButton = createButton('submit', 'edit', '');
    ac(buttonsWrapper, editButton);
    const removeButton = createButton('submit', 'remove', '');
    ac(buttonsWrapper, removeButton);
    ac(listItemWrapper, listItem);
    ac(listItemWrapper, addressSection);
    ac(listItemWrapper, contactWrapper);
    ac(listItemWrapper, buttonsWrapper);
    return listItemWrapper;
  };

  removeListItem(e) {
    e.preventDefault();
    const addressRoot = this.getAddressRoot(e);
    rc(this.addressListHook, addressRoot);
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