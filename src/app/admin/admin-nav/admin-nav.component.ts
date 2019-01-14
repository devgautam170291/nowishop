import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../services/http.service';
import { NowishopService } from '../../services/nowishop.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./../admin.component.css']
})

export class AdminNavComponent implements OnInit {

  constructor(
    private router:Router,
    private http: HttpClient, 
    private dataService: HttpService,
    private nowishopGlobal: NowishopService
  ) { }

  @Output() setLoading = new EventEmitter();
  loading: any = false;
  ngOnInit() {
  }

  logoutAdmin(){
    debugger
  	if(this.nowishopGlobal.isUserInfo()){
      var userInfo = this.nowishopGlobal.getUserInfo();
      var model = {
        "UserId": userInfo['userId']
      }
      this.setLoading.emit(true);
      this.http.post(this.dataService.baseUrl + 'User/Logout', model).subscribe(
        res => {
          this.setLoading.emit(false);
          if(res['IsSuccess']){
            this.nowishopGlobal.deleteUserInfo();
            this.router.navigate(['/login']);
          }
        }
      )
  	}
  }

}
