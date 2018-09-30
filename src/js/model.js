import { Address } from './single-address';
export class Store {
  
  constructor() {
    this.listName = 'Address Book';
  };

  fetchAddressList() {
    try {
      return JSON.parse(localStorage.getItem(this.listName)) || []
    } catch(err) {
      console.error('Error: ', err);
    };
  };

  saveAddressList(addressList) {
    try {
      return localStorage.setItem(this.listName, JSON.stringify(addressList));
    } catch(err) {
      console.error('Error: ', err);
    };
  };

  addNewAddress(newAddress) {
    const list = this.fetchAddressList();
    const newList = [ ...list, newAddress];
    this.saveAddressList(newList);
  };

  removeAddress(id) {
    const addressList = this.fetchAddressList();
    const newList = addressList.filter(address => address.id !== id);
    this.saveAddressList(newList);
  };
};
