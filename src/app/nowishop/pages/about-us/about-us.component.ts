import { Component, OnInit } from '@angular/core';
declare let $: any;

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor() { }

  breedcrumb: any;
  showModal: any = false;
  modalTitle: any;
  modalDesc: any;
  whoWeare: any;
  whatWeDo: any;
  whatMakeUsUnique: any;

  ngOnInit() {
  	this.showBreedcrumb();
    this.setText();
  }

  showBreedcrumb(){
    this.breedcrumb = [
      {
        "name": "Home",
        "url": "/",
        "active": false
      },
      {
        "name": "About Us",
        "url": "#",
        "active": true
      }
    ];
  }

  setText(){
    this.whoWeare = "this is who we are related text";
    this.whatWeDo = "this is what we do related text";
    this.whatMakeUsUnique = "this is what make us unique related code"; 
  }

  closeModal(){
    this.showModal = false;
    this.modalTitle = "";
    this.modalDesc = "";
    $('#show-modal').modal('hide');
  }

  openModal(e){
    e.preventDefault();
    var titleName = $("."+e.currentTarget.className).text();
    var className = e.currentTarget.className;
    debugger
    if(className == 'who-text'){
      this.modalTitle = "Who we are?";
      this.modalDesc = this.whoWeare;
    }
    else if(className == "what-text"){
      this.modalTitle = "What do we do?";
      this.modalDesc = this.whatWeDo;
    }
    else {
      this.modalTitle = "what make us unique and reliable?";
      this.modalDesc = this.whatMakeUsUnique;
    }

    this.showModal = true;
    $('#show-modal').modal('show');

  }

}
