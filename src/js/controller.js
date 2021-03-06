import { Address } from './single-address';
import { setInitialFormValues } from './helpers';

export class Controller {

  constructor(store, view) {
    this.store = store;
    this.view = view;

    this.view.bindAddAddress(this.addNewAddress.bind(this));
    this.view.bindRemoveAddress(this.removeAddress.bind(this));
    this.view.bindEditAddress(this.editAddress.bind(this));
    this.view.bindUpdateAddress(this.updateAddress.bind(this));
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
    const editedAddress = addressList.find(address => address.id === id);
    this.view.editAddress(editedAddress);
  };

  cancelEditAddress() {
    const addressList = this.store.fetchAddressList();
    this.view.cancelEditAddress(addressList);;
  };

  updateAddress(editConfig) {
    this.store.updateAddress(editConfig);
    const addressList = this.store.fetchAddressList();
    this.view.updateAddress(addressList);
  };

  setInitialView() {
    const addressList = this.store.fetchAddressList();
    this.view.viewInit(addressList);
  };
};