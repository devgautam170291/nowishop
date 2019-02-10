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
    $('.content-section').each(function(){
      $(this).removeClass('active');
    })
  }

  openModal(e){
    e.preventDefault();
    $('.content-section').each(function(){
      $(this).removeClass('active');
    })
    $(e.currentTarget).closest('.title-container').find('.content-section').addClass('active');

  }

}
