import { Component, OnInit } from '@angular/core';
import { ResetPasswordModel, ErrorModel } from './reset-password-model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from  '@angular/common/http';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./../login-register.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(
  		private route: ActivatedRoute, 
	    private http: HttpClient, 
	    private dataService: HttpService, 
	    private router: Router
  	) { }

  model: any;
  userId: any = "";
  showMessage: any = false;
  messageClass: any;
  message: any;
  loading: any = false;
  error: any;

  ngOnInit() {
  	this.model = new ResetPasswordModel();
    this.error = new ErrorModel();

  	if(this.route.snapshot.params.id){
  		this.userId = this.route.snapshot.params.id;
  	}
  }

  checkFieldHasValue(field){
    // this.error = this.validate.validateRecordInField(this.model, field, this.error);
  }

  matchConfirmPassword(){
    debugger
    // this.error = this.validate.validateConfirmPassword(this.model, 'NewPassword', 'confirmPassword', this.error);
  }

  resetPassword(){
    debugger
  	this.model.UserID = this.userId;
    this.matchConfirmPassword();
    // this.validate.checkErrorObject(this.error);
    // this.error = this.validate.validateRequire(this.model, this.error);
    console.log('checkerror');
    console.log(this.error);
    //if(this.error.valid){
      this.loading = true;
      this.http.post(this.dataService.baseUrl + 'User/UpdatePassword', this.model).subscribe(
        res => {
          debugger
          this.loading = false;
          if(res['IsSuccess']){
            this.showMessage = true;
              this.messageClass = "success";
              this.message = "Password Successfully Updated";
              setTimeout(()=>{
                this.router.navigate(['/login']);
              }, 2000)
          }
          else {
            this.showMessage = true;
            this.messageClass = "error";
            this.message = res['message'];
          }
        }
      )
   // }
  }

}
