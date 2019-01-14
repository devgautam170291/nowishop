import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NowishopService } from './nowishop.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable()
export class HttpService {

  public baseUrl = "http://api.nowishop.com/api/";
  public imageUrl = "http://api.nowishop.com/ProductImages/";
  public userInfo: any;
  constructor(private http: HttpClient, private router: Router, private nowishopGlobal: NowishopService) { }
  
  private getHeaders() {
    if(!this.nowishopGlobal.isUserInfo()) {
      this.showSessionExpiredMsg();
    }

    var headerParams = {
      "Accept": "application/json",
      "Token": this.nowishopGlobal.getUserInfo().authToken
    }

    let headers = new HttpHeaders(headerParams);
    return headers;
  }

  get(url: string): any {
    return this.http.get(`${this.baseUrl}` + url, { headers: this.getHeaders() }).pipe(
      map(res=>{
        debugger
        if(res['status'] == 401){          
          this.showSessionExpiredMsg();
        }
        return res;
      })
    );
  }

  post(url: string, Data: any) {
    return this.http.post(`${this.baseUrl}` + url, Data, { headers: this.getHeaders() }).pipe(
      map(res=>{
        debugger
        if(res['status'] == 401){
          this.showSessionExpiredMsg();
        }
        return res;
      })
    );
  }

  showSessionExpiredMsg(){
      Swal({
        title: 'Session Expired!',
        text: 'Your session has been expired. Please relogin.',
        type: 'warning',
        showCancelButton: false,
        confirmButtonText: 'Redirect to Login Page'
      }).then((result) => {
        if (result.value) {
          this.nowishopGlobal.deleteUserInfo();
          this.router.navigate(['/login']);
        }
      })
  }
}
