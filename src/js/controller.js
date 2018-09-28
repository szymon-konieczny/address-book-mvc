import { Address } from './single-address';
import { appendChild, setInitialFormValues } from './helpers';

export class Controller {

  constructor(store, view) {
    this.store = store;
    this.view = view;

    this.HIDDEN_STATE_STRING = 'hidden';
    
    this.initialFormState = setInitialFormValues();

    this.addressList = this.store.fetchAddressList();

    this.addButton = this.view.getAddButton();
    this.saveButton = this.view.getSaveButton();
    this.cancelButton = this.view.getCancelButton();

    this.view.bindAddAddress(this.addNewAddress.bind(this));
    this.view.bindRemoveAddress(this.removeAddress.bind(this));
    this.view.bindEditAddress(this.editAddress.bind(this));
    this.view.bindSaveEditedAddress(this.saveEditedAddress.bind(this));
    this.view.bindCancelEditAddress(this.cancelEditAddress.bind(this));
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
    const list = this.store.fetchAddressList();
    const newAddress = new Address(addressConfig);
    const newList = [ ...list, newAddress];

    this.view.fillFormInputs(this.initialFormState);
    this.store.saveAddressList(newList);

    return newAddress;
  };

  removeAddress(id) {
    const addressList = this.store.fetchAddressList();
    const newList = addressList.filter(address => address.id !== id);
    this.store.saveAddressList(newList);
  };

  editAddress(id) {
    const addressList = this.store.fetchAddressList();
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

  cancelEditAddress() {
    this.view.fillFormInputs(this.initialFormState);
    this.hideEditButtons();
    this.view.clearAddressList();
    this.showList();
  };

  saveEditedAddress() {
    const editConfig = this.getFormInputsValues();
    const addressData = this.store.fetchAddressList();
    const editedData = addressData.map(address => {
      if (address.id === editConfig.id) {
        return editConfig;
      };
      return address;
    });
    this.store.saveAddressList(editedData);
    this.view.fillFormInputs(this.initialFormState);
    this.hideEditButtons();
    this.view.clearAddressList();
    this.showList();
  };

  showList() {
    const listRoot = this.view.getAddressListRoot();
    const addressList = this.store.fetchAddressList();
    this.view.fillFormInputs(this.initialFormState);

    addressList.map(addressItem => {
      const address = this.view.createListItem(addressItem);
      appendChild(listRoot, address);
    });
  };

  viewInit() {
    this.view.fillFormInputs(this.initialFormState);
    this.hideEditButtons();
    this.showList();
  };
};