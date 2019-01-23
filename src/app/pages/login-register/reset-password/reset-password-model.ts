export class ResetPasswordModel {
	OTP: any;
  NewPassword: any ;
  confirmPassword: any;
  UserID: any;

  constructor(){
  	this.OTP = "";
  	this.NewPassword = "";
  	this.confirmPassword = "";
  	this.UserID = "";
  }
}

export class ErrorModel {
	valid: boolean;
	OTP: any;
	NewPassword: any;
	confirmPassword: any;

	constructor(){
		this.OTP = "";
  	this.NewPassword = "";
  	this.confirmPassword = "";
  	this.valid = false;
	}

}