export class MyShippingModel {
	"name": any;
	"ShippingAddressID": any;
	"ShippingAddress": any;
	"UserID": any;
	"PhoneNo": any;

	constructor(){
		this.name = "";
		this.ShippingAddress = new AddressDetails() ;
		this.PhoneNo = "";
	}
}

export class AddressDetails {
	"line1": any;
	"line2": any;
	"city": any;
	"state": any;
	"country": any;
	"pin": any;

	constructor(){
		this.line1 = "";
		this.line2 = "";
		this.city = "";
		this.state = "";
		this.country = "";
		this.pin = "";
	}
}