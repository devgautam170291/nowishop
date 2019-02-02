import { Component, OnInit } from '@angular/core';
import { NowishopService } from '../../../services/nowishop.service';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../services/http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-new-notification',
  templateUrl: './add-new-notification.component.html',
  styleUrls: ['./../../admin.component.css']
})
export class AddNewNotificationComponent implements OnInit {

  constructor(
  	private nowishopGlobal: NowishopService,
  	private http: HttpClient, 
  	private dataService: HttpService
  ) { }

  model: any = {};
  loading: any;
  breedcrumb: any = [];
  notificationType: any;
  membershipData: any = [];

  ngOnInit() {
  	this.setNotificationModel();
  	this.showBreedcrumb();
  	this.getMembershipDetails();
  }

  setNotificationModel(){
  	this.model = {
		"ImportantMessages":"",
		"Promotions":"",
		"Coupons":"",
		"MemberShipID":0,
		"CreatedBy":this.nowishopGlobal.getUserInfo().userId
	}
  }

  getMembershipDetails(){
  	this.dataService.get('UserAccount/GetMemberShip').subscribe(
  		res => {
  			if(res['IsSuccess']){
  				this.membershipData = res['Data'];
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
        "name": "Notifications",
        "url": "/admin/notifications",
        "active": false
      },
      {
        "name": "Add New Notification",
        "url": "#",
        "active": true
      }
    ];
  }

  onMembershipChange(){
  	this.model.Promotions = "";
  	this.model.Coupons = "";
  	this.model.ImportantMessages = "";
  }

  uploadNotificationImg(e, notificationType){
  	if(e.currentTarget.files.length){
      var formData = new FormData();
      formData.append('UploadedImage', e.target.files[0]);
      this.loading = true;
      this.dataService.post('Product/SaveImage', formData).subscribe(
        res => {
          this.loading = false;
          if(res['IsSuccess']){
          	if(notificationType == 2){
          		this.model['Promotions'] = this.dataService.imageUrl + res['Data'];
          	} 
          	else if(notificationType == 3){
          		this.model['Coupons'] = this.dataService.imageUrl + res['Data'];
          	}           
          }
        }
      )
    }
  }

  uploadNotification(){
  	this.loading = true;
  	this.dataService.post('UserAccount/AddNotification', this.model).subscribe(
  		res=>{
  		  this.loading = false;
          if(res['IsSuccess']){
            Swal("Success!", "Notification successfully uploaded", "success");
          }
          else{
            Swal("OOPS!", "Something went wrong", "error");
          }
  		}
  	)
  }

}
