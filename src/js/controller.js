import { Store } from './model';
import { View } from './view';
import { Address } from './single-address';
import { appendChild, toggleEmptyListMessage, setInitialFormValues } from './helpers';

export class Controller {

  constructor() {

    this.HIDDEN_STATE_STRING = 'hidden';
    
    this.initialFormState = setInitialFormValues();

    this.store = new Store();
    this.addressList = this.store.fetchFromLocalStorage();
    
    this.view = new View();
    this.form = this.view.getFormHook();
    this.formButtonsWrapper = this.view.getFormButtonsWrapper();
    this.addButton = this.view.createAddButton();
    this.cancelButton = this.view.createCancelButton();
    this.saveButton = this.view.createSaveButton();

    this.view.bindAddAddress(this.addNewAddress.bind(this));
    this.view.bindRemoveAddress(this.removeAddress.bind(this));
    this.view.bindEditAddress(this.editAddress.bind(this));
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

  addNewAddress() {
    const addressConfig = this.getFormInputsValues();
    const list = this.store.fetchFromLocalStorage();
    const newAddress = new Address(addressConfig);
    const newList = [ ...list, newAddress];

    this.view.fillFormInputs(this.initialFormState);
    this.store.saveToLocalStorage(newList);

    toggleEmptyListMessage(newList);
    return newAddress;
  };

  removeAddress(id) {
    const addressList = this.store.fetchFromLocalStorage();
    const newList = addressList.filter(address => address.id !== id);
    this.store.saveToLocalStorage(newList);
    toggleEmptyListMessage(this.store.fetchFromLocalStorage());
  };

  editAddress(id) {
    const addressList = this.store.fetchFromLocalStorage();
    let editedAddressConfig = {};
    
    addressList.filter(address => address.id === id)
      .map(el => editedAddressConfig = { ...editedAddressConfig, ...el });

    this.view.fillFormInputs(editedAddressConfig);
    this.showEditButtons();
  };

  getFormInputsValues() {
    let addressConfig = {};
    [...document.forms[0]]
      .map(el => el.tagName === 'INPUT' 
        ? addressConfig = { ...addressConfig, [el.name]: el.value }
        : el
      );
    this.view.fillFormInputs(this.initialFormState);
    return addressConfig;
  };

  cancelEditAddress(e) {
    e.preventDefault();
    this.view.fillFormInputs(this.initialFormState);
    this.hideEditButtons();
    this.view.clearAddressList();
    this.showList();
  };

  saveEditedAddress(e) {
    e.preventDefault();
    const editConfig = this.getFormInputsValues();
    const addressData = this.store.fetchFromLocalStorage();
    const editedData = addressData.map(address => {
      if (address.id === editConfig.id) {
        return editConfig;
      };
      return address;
    });
    this.store.saveToLocalStorage(editedData);
    this.view.fillFormInputs(this.initialFormState);
    this.hideEditButtons();
    this.view.clearAddressList();
    this.showList();
  };

  showList() {
    const listRoot = this.view.getAddressListRoot();
    const addressList = this.store.fetchFromLocalStorage();
    this.view.fillFormInputs(this.initialFormState);

    addressList.map(addressItem => {
      const address = this.view.createListItem(addressItem);
      appendChild(listRoot, address);
    });
  };

  showformButtons() {
    this.cancelButton.addEventListener('click', e => this.cancelEditAddress(e));
    this.saveButton.addEventListener('click', e => this.saveEditedAddress(e));

    appendChild(this.formButtonsWrapper, this.addButton);
    appendChild(this.formButtonsWrapper, this.saveButton);
    appendChild(this.formButtonsWrapper, this.cancelButton);
    this.hideEditButtons();
  };

  viewInit() {
    this.view.fillFormInputs(this.initialFormState);
    this.showformButtons();
    this.showList();
    toggleEmptyListMessage(this.addressList);
  };
};