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

export class PaymentModel {
	"sellerId": any;
	"publishableKey": any;
	"ccNo": any;
	"expMonth": any;
	"expYear": any;
	"cvv": any; 

	constructor(){
		this.sellerId = "901403184";
		this.publishableKey = "6EB55590-9438-4FA0-9DA8-65323FFB1139";
		this.ccNo = "";
		this.expMonth = "";
		this.expYear = "";
		this.cvv = "";
	}
} 