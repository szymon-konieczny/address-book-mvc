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

  clearStore() {
    return localStorage.removeItem(this.listName);
  };
};
