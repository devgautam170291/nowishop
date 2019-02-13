import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../../services/http.service';
import { NowishopService } from '../../../../services/nowishop.service';
import { Router } from '@angular/router';
declare let $: any;

@Component({
  selector: 'app-my-personal-info',
  templateUrl: './my-personal-info.component.html',
  styleUrls: ['./my-personal-info.component.css', '../my-account.component.css']
})
export class MyPersonalInfoComponent implements OnInit {

  constructor(
  	private http: HttpClient, 
    private dataService: HttpService,
    private nowishopGlobal: NowishopService
  	) { }

  ngOnInit() {
  }

  ngAfterViewChecked(){
    $('.datetimepicker').datetimepicker({ 
        allowInputToggle: false,
        inline: false,
        sideBySide: true,
        keepOpen: false,
        debug: false,
        format: 'YYYY-MM-DD',
    });
  }

}
