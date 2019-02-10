import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../../services/http.service';
import { NowishopService } from '../../../../services/nowishop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-browsing-history',
  templateUrl: './my-browsing-history.component.html',
  styleUrls: ['./my-browsing-history.component.css']
})
export class MyBrowsingHistoryComponent implements OnInit {

  constructor(
  	private http: HttpClient, 
    private dataService: HttpService,
    private nowishopGlobal: NowishopService
  	) { }

  ngOnInit() {
  }

}
