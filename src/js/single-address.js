import uuid from 'uuid';

export class Address {
  constructor(addressData) {
		this.id = uuid(),
		this.firstName = addressData.firstName;
		this.lastName = addressData.lastName;
		this.email = addressData.email;
		this.phoneNo = addressData.phoneNo;
		this.street = addressData.street;
		this.streetNo = addressData.streetNo;
		this.town = addressData.town;
		this.postalCode = addressData.postalCode;
	};
};