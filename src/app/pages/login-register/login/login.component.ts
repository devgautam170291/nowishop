import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Component, OnInit, HostListener , Inject} from '@angular/core';
import { LoginModel, UserLoginInfo, ValidationModel } from './login-model';
import { HttpClient } from  '@angular/common/http';
import { HttpService } from './../../../services/http.service';
import { NowishopService } from './../../../services/nowishop.service';
import { Router, ActivatedRoute } from '@angular/router';
declare let $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./../login-register.css']
})
export class LoginComponent implements OnInit {

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, 
  		private http: HttpClient, 
      private dataService: HttpService, 
      private router: Router,
      private nowishopGlobal: NowishopService,
      private route: ActivatedRoute
  	) { }

  model: any;
  showMessage: any = false;
  messageClass: any;
  message: any;
  loading: any = false;
  remember: any;
  returnUrl: string;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if(event.key.toLowerCase() == "enter"){
      $("#login").click();
    }
  }

  ngOnInit() {
  	this.model = new LoginModel();
    this.loadParams();
  	this.checkAlreadyLoggedIn();
  }

  checkAlreadyLoggedIn(){
    var userInfo = this.nowishopGlobal.getUserInfo();
    if(userInfo){
      this.redirectUser(userInfo);
    }
  }

  loadParams(){
    this.returnUrl = this.route.snapshot.queryParams['returnTo'] || '/';
  }

  login(){
    this.loading = true;
      this.http.post(this.dataService.baseUrl + 'User/Authentication', this.model).subscribe(
        res => {
          this.loading = false;
          if(res['IsSuccess']){
            this.showMessage = true;
            this.messageClass = "success"
            this.message = "Welcome Back"; 
            
            this.saveUserInfo(res);        
          }
          else{
            this.showMessage = true;
            this.messageClass = "error"
            this.message = "Invalid Email / Mobile No. or Password."
          }
        }
      )
  }

  saveUserInfo(res){
    var userInfo = new UserLoginInfo();
    userInfo.userId = res['UserId'];
    userInfo.firstName = res['FirstName'];
    userInfo.middleName = res['MiddleName'];
    userInfo.lastName = res['LastName'];
    userInfo.profilePic = res['ProfilePic'];
    userInfo.userRoleId = res['UserRoleId'];
    userInfo.userRoleName = res['UserRoleName'];
    userInfo.emailId = res['EmailId'];
    userInfo.phNumber = res['TelephoneNo'];
    userInfo.address = res['Address'];
    userInfo.authToken = res['AuthToken'];
    userInfo.memberShipId = res['MemberShipID'];
    userInfo.memberShipName = res['MemberShipName'];


    // if(this.remember){
    //   localStorage.setItem('userInfo', JSON.stringify(userInfo));
    // }

    // this.dataService.userInfo = userInfo;
    this.nowishopGlobal.setUserInfo(userInfo);
    this.redirectUser(userInfo);
  }

  setRememberMe(e){
    this.remember = $(e.currentTarget).prop('checked');
  }

  redirectUser(userInfo){
    debugger
    if(!userInfo.authToken || !userInfo.userRoleId){
      this.router.navigate(['/login']);
    }

    switch (parseInt(userInfo.userRoleId)) {
      // For admin
      case 1:
        this.router.navigate([this.returnUrl]);
        break;

      // For Customer
      case 2: 
        if(this.returnUrl.toLowerCase().includes('admin')){
          notAllowed();
        }

        this.router.navigate([this.returnUrl]);
        break;
      
      default:
        notAllowed();
        break;
    }

    function notAllowed(){
      this.router.navigate(['/']);
    }
   
  }

}
