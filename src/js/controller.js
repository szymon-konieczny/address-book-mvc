import { Address } from './single-address';
import { setInitialFormValues } from './helpers';

export class Controller {

  constructor(store, view) {
    this.store = store;
    this.view = view;
    
    this.initialFormState = setInitialFormValues();

    this.addressList = this.store.fetchAddressList();

    this.view.bindAddAddress(this.addNewAddress.bind(this));
    this.view.bindRemoveAddress(this.removeAddress.bind(this));
    this.view.bindEditAddress(this.editAddress.bind(this));
    this.view.bindSaveEditedAddress(this.saveEditedAddress.bind(this));
    this.view.bindCancelEditAddress(this.cancelEditAddress.bind(this));
  };

  addNewAddress() {
    const addressConfig = this.view.getFormInputsValues();
    const list = this.store.fetchAddressList();
    const newAddress = new Address(addressConfig);
    const newList = [ ...list, newAddress];

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
  };

  cancelEditAddress() {
    const addressList = this.store.fetchAddressList();
    return addressList;
  };

  saveEditedAddress() {
    const editConfig = this.view.getFormInputsValues();
    const addressData = this.store.fetchAddressList();
    const editedData = addressData.map(address => {
      if (address.id === editConfig.id) {
        return editConfig;
      };
      return address;
    });
    this.store.saveAddressList(editedData);
    return editedData;
  };

  viewInit() {
    this.view.fillFormInputs(this.initialFormState);
    this.view.hideEditButtons();
    this.view.showList(this.addressList);
  };
};