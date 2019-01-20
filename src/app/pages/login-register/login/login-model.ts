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
	phNumner: any;
	address: any;
	authToken: any;

	constructor(){
		this.userId = "";
		this.firstName = "";
		this.middleName = "";
		this.lastName = "";
		this.profilePic = "";
		this.userRoleId = "";
		this.userRoleName = "";
		this.emailId = "";
		this.phNumner = "";
		this.address = "";
		this.authToken = "";
	}
}