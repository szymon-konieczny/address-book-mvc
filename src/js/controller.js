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

  getFormInputsValues(inputValues) {
    return inputValues;
  };

  addNewAddress(addressConfig) {
    const newAddress = new Address(addressConfig);
    this.store.addNewAddress(newAddress);
    this.view.addNewAddress(newAddress);
  };

  removeAddress(id) {
    this.store.removeAddress(id);
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