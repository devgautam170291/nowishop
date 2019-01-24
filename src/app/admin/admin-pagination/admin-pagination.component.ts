import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
declare let $: any;

@Component({
  selector: 'app-admin-pagination',
  templateUrl: './admin-pagination.component.html',
  styleUrls: ['./../admin.component.css']
})
export class AdminPaginationComponent implements OnInit {

  constructor() { }

  @Input() totalCount;
  @Input() countToShow;
  @Output() changePageNumber = new EventEmitter();
  paginationShowObj: any = [];

  ngOnInit() {
  	this.addPagination();
  }

  addPagination(){
  	if(this.countToShow < this.totalCount){
  		var totalPagination = Math.ceil(this.totalCount / this.countToShow);
  		if(totalPagination){
  			for(let i=0; i<totalPagination; i++){
  				this.paginationShowObj.push({});
  			}
  		}
  	}
  }

  changePagination(index, e){
  	debugger
    e.preventDefault();
    if(e){
      $(e.target).closest('.pagination').find('.page-item').each(function(){
        $(this).removeClass('active');
      })
      $(e.target).closest('.page-item').addClass('active');
    }
  	this.changePageNumber.emit(index+1);
  }

}
