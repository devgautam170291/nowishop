import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../services/http.service';
import { AddNewUserModel } from './addnewuser-model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addnewuser',
  templateUrl: './addnewuser.component.html',
  styleUrls: ['./../../admin.component.css']
})
export class AddnewuserComponent implements OnInit {

  constructor(private http: HttpClient, private dataService: HttpService, private route: ActivatedRoute) { }
  breedcrumb: any = [];
  model: any;
  loading: any;
  case: any;
  confirmPassword: any;
  userRoles: any = [];

  ngOnInit() {
    this.getUserRoles();
    this.checkCase();
  	this.showBreedcrumb();
    this.model = new AddNewUserModel();    
  }

  showBreedcrumb(){
    this.breedcrumb = [
      {
        "name": "Admin",
        "url": "/admin",
        "active": false
      },
      {
        "name": "Users",
        "url": "/admin/users",
        "active": false
      },
      {
        "name": (this.case == "edit" ? "Edit" : "Add New") + " User",
        "url": "#",
        "active": true
      }
    ];
  }

  checkCase(){    
    if(this.route.snapshot.params.id){
      this.case = 'edit';
      this.getEditUserData(this.route.snapshot.params.id);
    }
    else{
      this.case = 'add';
    }
  }

  getUserRoles(){
    this.loading = true;
    this.http.get(this.dataService.baseUrl + 'User/GetRoleList').subscribe(
      res => {
        this.loading = false;
        this.userRoles = res['Data'];
      }
    )
  }

  getEditUserData(id){
    this.loading = true;
    this.http.get(this.dataService.baseUrl + 'User/GetUserProfile/' + id).subscribe(
        res => {
          this.loading = false;
          if(res['IsSuccess']){
            console.log(res);
            this.model = res['Data'][0];
          }
        }
      )
  }

  uploadUser(){
    this.loading = true;
    if(this.case == "add"){
      this.addEditUser('User/SignUp',this.model);
    }
    else{
      // this.addEditUser('Product/EditProduct',this.model);
    }
  }

  addEditUser(url, data){
    this.http.post(this.dataService.baseUrl + url, data).subscribe(
        res => {
          this.loading = false;
           if(res['IsSuccess']){
               Swal("Success!", "User successfully uploaded", "success");
           }
        }
      )
  }

}
