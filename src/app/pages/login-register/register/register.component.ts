import { Component, OnInit, HostListener } from '@angular/core';
import { RegisterModel } from './register-model';
import { HttpClient } from  '@angular/common/http';
import { HttpService } from '../../../services/http.service';
declare let $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./../login-register.css']
})
export class RegisterComponent implements OnInit {

  constructor(
  		private http: HttpClient, 
  		private dataService: HttpService
  	) { }

   model: any;
   confirmPassword: any;
   confirmPasswordError: any = "";
   termsandconditionChack: boolean = false;
   loading: any;
   showMessage: any = false;
   messageClass: any;
   message: any;

  ngOnInit() {
  	this.model = new RegisterModel();
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if(event.key.toLowerCase() == "enter"){
      $("#register")[0].click();
    }
  }

  validateModel(model){
  	for(let i in model){
  		if(!model[i]){
  			return false;
  		}
  	}
  	return true;
  }

  registerUser(e){
  	debugger
    e.preventDefault();
    var validateResult = this.validateModel(this.model);
    if(!validateResult){
    	this.printErrorMessage("Please fill all fields");
    	return;
    }
    if(!this.termsandconditionChack){
    	this.printErrorMessage("Please accept our Terms & Conditions");
    	return;
    }
    if(this.termsandconditionChack){
      this.showMessage = false;
      this.loading = true;
      this.http.post(this.dataService.baseUrl + 'User/SignUp', this.model).subscribe(
        res=>{
          this.loading = false;
          if(res['IsSuccess']){
            this.showMessage = true;
            this.messageClass = "success";
            this.message = "User Successfully Created";
          }
          else{
            this.showMessage = true;
            this.messageClass = "error";
            this.message = res['Message'];
          }
        }
      )
    }
  }

  printErrorMessage(msg){
  	this.showMessage = true;
    this.messageClass = "error";
    this.message = msg;
  }

  confirmPasswordChange(e){
    if(this.model.Password){
      if(this.confirmPassword == this.model.Password){
        this.confirmPasswordError = "";
      }
      else{
        this.confirmPasswordError = "Password Mismatch";        
      }
    }
    else{

    }
  }

  setTermsAndConditons(e){
    if($('.terms-agree').prop('checked')){
      this.showMessage = false;
      this.termsandconditionChack = true;
    }
    else {
      this.termsandconditionChack = false;      
    }
  }

}
