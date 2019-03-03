export class LoginModel{
	email: any;
	password: any;

	constructor(){
		this.email = "";
		this.password = "";
	}
}

export class ValidationModel{
	email: any;
	password: any;
	remember: any;
	success: any;

	constructor(){
		this.email = "";
		this.password = "";
		this.remember = "";
		this.success = true;
	}
}

export class UserLoginInfo{
	userId: any;
	firstName: any;
	middleName: any;
	lastName: any;
	profilePic: any;
	userRoleId: any;
	userRoleName: any;
	emailId: any;
	phNumber: any;
	address: any;
	authToken: any;
	memberShipId: any;
	memberShipName: any;

	constructor(){
		this.userId = "";
		this.firstName = "";
		this.middleName = "";
		this.lastName = "";
		this.profilePic = "";
		this.userRoleId = "";
		this.userRoleName = "";
		this.emailId = "";
		this.phNumber = "";
		this.address = "";
		this.authToken = "";
		this.memberShipId = 0;
		this.memberShipName = "";
	}
}