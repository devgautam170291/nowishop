import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from  '@angular/common/http';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./../login-register.css']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(
  		private http: HttpClient, 
  		private dataService: HttpService, 
  		private router: Router
  	) { }

  email: any;
  loading: any = false;
  showMessage: any = false;
  messageClass: any;
  message: any; 	

  ngOnInit() {
  }

  onEmailChange(){
    debugger
    this.showMessage = false;
  }

  forgetPassword(e){
    e.preventDefault();
    if(this.email){
      this.loading = true;
      var model = {
        "emailID": this.email
      }
      this.http.post(this.dataService.baseUrl + 'User/ForgotPassword', model).subscribe(
          res => {
            this.loading = false;
            if(res['IsSuccess']){
              var userId = res['Data']['UserID'];
              if(userId){
                 this.router.navigate(['/reset-password', userId]);
              }
            }
            else {
              this.showMessage = true;
              this.messageClass = "error";
              this.message = res['Message'];
            }
          }
        )
      
    }   
    
  }

}
