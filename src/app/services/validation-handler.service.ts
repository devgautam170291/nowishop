import { Injectable } from '@angular/core';

@Injectable()
export class ValidationHandlerService {

  error: any;

  constructor() {
  }

  validateRequire(data, error){
  	for(let record in data){
      debugger
  		if(!data[record]){
  			error[record] = "This field is required";
        error.valid = false;
  		}
  	}
  	return error;
  }

  checkErrorObject(error){
    for(let errorField in error){
      debugger
      if(error[errorField] && (errorField != 'valid')){
        error.valid = false;
        break;
      }
      else {
        error.valid = true;
      }
    }
  }  

  validateRecordInField(data, field, error){
    if(!data[field]){
      error[field] = "This field is required";
    }
    else {
      error[field] = "";
    }
    return error;
  }

  validateEmail(params, key){

  }

  validateConfirmPassword(params, passwordKey, confirmPasswordKey, error){
    if(!params[passwordKey] || !params[confirmPasswordKey]){
      if(!params[passwordKey]){
        error[passwordKey] = "Please enter password";
      }
      
      if(!params[confirmPasswordKey]){
        error[confirmPasswordKey] = "Please enter confirmed password";
      }

      return error;
    }

    if(params[passwordKey] != params[confirmPasswordKey]){
      error[confirmPasswordKey] = "Password did not matched";
    }
    else {
      error[confirmPasswordKey] = "";
    }
    return error;
  }

}
