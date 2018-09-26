import { Store } from './model';
import { View } from './view';
import { Address } from './single-address';
import { ac, showMessage, isListEmpty } from './helpers';
import { setInitialFormValues } from './template';

export class Controller {

  noAddressMessage = 'There is no address in the book yet';

  constructor(listName) {
    
    this.listName = listName;
    this.initialFormState = setInitialFormValues();

    this.store = new Store(listName);
    this.editStore = new Store('isEdited');
    this.isEditing = this.editStore.fetchFromLocalStorage('isEdited');
    this.addressList = this.store.fetchFromLocalStorage(this.listName);
    
    this.view = new View(listName);
    this.listRoot = this.view.getAddressListRoot();
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
    this.addButton.classList.add('hidden');
    this.saveButton.classList.remove('hidden');
    this.cancelButton.classList.remove('hidden');
  }

  hideEditButtons() {
    this.addButton.classList.remove('hidden');
    this.saveButton.classList.add('hidden');
    this.cancelButton.classList.add('hidden');
  };

  addNewAddress() {
    let addressConfig = this.getFormInputsValues();
   
    let list = this.store.fetchFromLocalStorage(this.listName);
    const newAddress = new Address(addressConfig);
    list = [ ...list, newAddress];

    this.view.fillFormInputs(this.initialFormState);
    this.store.saveToLocalStorage(list);

    isListEmpty(list) ? this.view.clearAddressList() : false;
    return newAddress;
  };

  removeAddress(id) {
    const addressList = this.store.fetchFromLocalStorage(this.listName);
    const newList = addressList.filter(address => address.id !== id);
    this.store.saveToLocalStorage(newList);

    isListEmpty(addressList) ? this.view.clearAddressList() : false;
  };

  editAddress(id) {
    const addressList = this.store.fetchFromLocalStorage(this.listName);
    let editedAddressConfig = {};
    addressList.filter(address => address.id === id)
      .map(el => editedAddressConfig = { ...editedAddressConfig, ...el });

    this.view.fillFormInputs(editedAddressConfig);
    this.isEditing = true;
    this.editStore.saveToLocalStorage(this.isEditing);
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
    this.isEditing = false;
    this.editStore.saveToLocalStorage(this.isEditing);
    this.view.fillFormInputs(this.initialFormState);
    this.hideEditButtons();
    this.view.clearAddressList();
    this.showList();
  };

  saveEditedAddress(e) {
    e.preventDefault();
    const editConfig = this.getFormInputsValues();
    let addressData = this.store.fetchFromLocalStorage(this.listName);
    const editedData = addressData.map(address => {
      if (address.id === editConfig.id) {
        return editConfig;
      };
      return address;
    });
    this.isEditing = false;
    this.editStore.saveToLocalStorage(this.isEditing);
    this.store.saveToLocalStorage(editedData);
    this.view.fillFormInputs(this.initialFormState);
    this.hideEditButtons();
    this.view.clearAddressList();
    this.showList();
  };

  showList() {
    const addressList = this.store.fetchFromLocalStorage(this.listName);
    this.view.fillFormInputs(this.initialFormState);

    return addressList.map(addressItem => {
      const address = this.view.createListItem(addressItem);
      ac(this.listRoot, address);
    });
  };

  showformButtons() {
    this.cancelButton.addEventListener('click', e => this.cancelEditAddress(e));
    this.saveButton.addEventListener('click', e => this.saveEditedAddress(e));

    ac(this.formButtonsWrapper, this.addButton);
    ac(this.formButtonsWrapper, this.saveButton);
    ac(this.formButtonsWrapper, this.cancelButton);
    this.hideEditButtons();
  };

  // removeAllAdresses() {
  //   this.store.clearStore();
  //   this.view.clearAddressList();
  // };

  viewInit() {
    
    this.view.fillFormInputs(this.initialFormState);
    this.showformButtons();
    
    this.addressList && this.addressList.length > 0
    ? this.showList() 
    : this.listRoot.innerHTML = showMessage(this.noAddressMessage);
  };
};