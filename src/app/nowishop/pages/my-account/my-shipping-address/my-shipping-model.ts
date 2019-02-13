export class MyShippingModel {
	"name": any;
	"address": any;
	"mobileNo": any;

	constructor(){
		this.name = "";
		this.address = [new AddressDetails()];
		this.mobileNo = "";
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