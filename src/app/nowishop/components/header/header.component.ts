import { Component, OnInit, Input, ChangeDetectorRef  } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../services/http.service';
import { NowishopService } from '../../../services/nowishop.service';
import { Observable  } from 'rxjs';
declare let $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  @Input() categoryList;
  @Input() selectedCategory;

  shipTo: any;
  searchCat: any;
  searchText: any;
  defaultSearch: any = {"CategoryId": 0, "CategoryName": "All"};
  cartInfo: any = [];

  constructor(
    private http: HttpClient, 
    private dataService: HttpService, 
    private nowishopGlobal: NowishopService,
    private ref: ChangeDetectorRef,
    private router: Router ) { 

    this.nowishopGlobal.cartInfoChange.subscribe(value => {
      debugger
      this.cartInfo = value;
    });
  }

  ngOnInit() {
  	this.changeShipping('India');
    this.changeSearchCategory(this.defaultSearch)
    this.loadJquery();   
  }

  loadJquery(){
    $('.dropdown-toggle.shopbycat').on('click', function (e) {
      $(this).next().toggle();
    });

    $('body').click(function(event){
      
      if ($(event.target).closest('.cat-container').length) {
      } else {
        $('#shopbycategory').hide();
      }
    });
  }

  changeShipping(country){
    this.shipTo = country;
  }

  changeSearchCategory(cat){
    this.searchCat = cat.CategoryName;
  }  

  changeCategory(e, cat){
    if(e){
      $(e.target).closest('.cat-container').find('li').each(function(){
        $(this).removeClass('active');
      })
      $(e.target).addClass('active');
    }    
    this.selectedCategory = cat['FirstLevelSubCategory'];
  }

  searchProducts(){
    this.router.navigate(['/search/',this.searchText]);
  }
}
