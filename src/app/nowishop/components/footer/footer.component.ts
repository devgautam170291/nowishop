import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../services/http.service';
import { NowishopService } from '../../../services/nowishop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  
  @Input() categoryList;
  subscribeEmail: any;
  constructor(
    private http: HttpClient, 
    private dataService: HttpService,
    private nowishopGlobal: NowishopService ) { }

  ngOnInit() {
  }

  subscribe(){
    if(this.subscribeEmail){
      var model = {
        "SubscriberEmail": this.subscribeEmail
      }
      this.http.post(this.dataService.baseUrl + 'Home/UsersSubscription', model).subscribe(
        res=>{
          debugger
        }
      )
    }
  }

}
