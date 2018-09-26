export class Store {
  
  constructor(listName) {
    this.listName = listName;
  };

  fetchFromLocalStorage() {
    try {
      return JSON.parse(localStorage.getItem(this.listName)) || []
    } catch(err) {
      console.error('Error: ', err);
    }
  };

  saveToLocalStorage(addressList) {
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
