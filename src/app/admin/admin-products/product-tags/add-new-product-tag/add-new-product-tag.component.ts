import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../../services/http.service';
import Swal from 'sweetalert2';
declare let $: any;

@Component({
  selector: 'app-add-new-product-tag',
  templateUrl: './add-new-product-tag.component.html',
  styleUrls: ['./../../../admin.component.css']
})
export class AddNewProductTagComponent implements OnInit {

  constructor(private http: HttpClient, private dataService: HttpService, private route: ActivatedRoute) { }

  breedcrumb: any = [];
  model: any = {};
  loading: any;
  case: any;

  ngOnInit() {
  	this.loading = false;
    this.checkCase();
    this.showBreedcrumb();    
  }

  ngAfterViewChecked(){
    $('.datetimepicker').datetimepicker({ 
        allowInputToggle: false,
        inline: false,
        sideBySide: true,
        keepOpen: false,
        debug: false,
        format: 'YYYY-MM-DD hh:mm A',
    });

    this.setDateTimePickerStyle();
  }

  setDateTimePickerStyle(){
    $('.datetimepicker').find('.bootstrap-datetimepicker-widget').css('width', '100%');
    $('.datetimepicker').find('.bootstrap-datetimepicker-widget table td span').css('background', '#eeeeee');
    $('.datetimepicker').find('.glyphicon-chevron-up').addClass('fa');
    $('.datetimepicker').find('.glyphicon-chevron-up').addClass('fa-arrow-up');
    $('.datetimepicker').find('.glyphicon-chevron-up').removeClass('glyphicon-chevron-up');
    $('.datetimepicker').find('.glyphicon-chevron-down').addClass('fa');
    $('.datetimepicker').find('.glyphicon-chevron-down').addClass('fa-arrow-down');
    $('.datetimepicker').find('.fa-arrow-down').addClass('glyphicon-chevron-down');
  }

  checkCase(){    
    if(this.route.snapshot.params.id){
      this.case = 'edit';
      this.getEditProductTagData(this.route.snapshot.params.id);
    }
    else{
      this.case = 'add';
      this.model['Deals'] = "";
      this.model['DealStartTime'] = "";
      this.model['DealEndTime'] = "";
    }
  }

  getEditProductTagData(id){
    this.loading = true;
    this.http.get(this.dataService.baseUrl + 'Product/GetProduct/' + id).subscribe(
        res => {
          this.loading = false;
          if(res['IsSuccess']){
            this.model = res['Data'][0];
          }
        }
      )
  }

  showBreedcrumb(){
    this.breedcrumb = [
      {
        "name": "Admin",
        "url": "/admin",
        "active": false
      },
      {
        "name": "Products",
        "url": "/admin/products",
        "active": false
      },
      {
        "name": "Products Tags",
        "url": "/admin/products/producttag",
        "active": false
      },
      {
        "name": (this.case == "add" ? "Add New" : "Edit") + " Product Tag",
        "url": "#",
        "active": true
      }
    ];
  }

  addProductTag(){
    this.loading = true;
    var startTime = $('#starttime').val();
    var endTime = $('#endtime').val();

    this.model.DealStartTime = startTime;
    this.model.DealEndTime = endTime;
    this.dataService.post('Deal/AddDeals', this.model).subscribe(
        res => {
          this.loading = false;
          if(res['IsSuccess']){
            Swal("Success!", "Product Tag successfully uploaded", "success");
          }
          else {
            Swal('OOPS...','Something went wrong!','error');
          }
        }
    )
  }
}
