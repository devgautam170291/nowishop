import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../services/http.service';
declare let $: any;

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  constructor(private http: HttpClient, private dataService: HttpService, private route: ActivatedRoute) { }

  breedcrumb: any;
  productInfo: any = [];
  quantity: any;
  wishlist: any = true;
  productMoreInfo: any = [];
  sliderImages: any = [];
  selectedVariation: any;
  loadDummy: any = true;

  ngOnInit() {
  	this.showBreedcrumb();
    this.getProductInfo();
    this.setDefaultQuantity();
  }

  showBreedcrumb(){
    this.breedcrumb = [
      {
        "name": "Home",
        "url": "/",
        "active": false
      },
      {
        "name": "Flash Deals",
        "url": "#",
        "active": false
      },
      {
        "name": "Produc Name",
        "url": "#",
        "active": true
      }
    ];
  }

  getProductInfo(){
  	var productSlug = this.route.snapshot.params.product_slug;
  	if(productSlug){
  		this.http.get(this.dataService.baseUrl + 'Home/SingleProduct/'+productSlug).subscribe(
  			res => {
  				if(res['IsSuccess']){
  					this.productInfo = res['Data'];
  					this.productMoreInfo = JSON.parse(this.productInfo.more_Data);
            this.checkFeaturedVariation(this.productInfo);
  					this.loadDummy = false;
  				}
  			}
  		)
  	}
  }

  checkFeaturedVariation(obj){
    if(obj.featuredColor){
      if(obj.productVariation.length){
        obj.productVariation.forEach((data)=>{
          if(data.variationColor.toLowerCase() == obj.featuredColor.toLowerCase()){
            this.setVariation(data);
            return false;
          }
        })
      }
    }
  }

  setVariation(obj, e = null){
  	this.selectedVariation = obj;
    this.sliderImages = obj.variationColorURL;
  	if(e){
  		$(e.target).closest('.product-variations').find('li').each(function(){
  			$(this).removeClass('active');
	  	})
	  	$(e.target).closest('li').addClass('active');
  	}
  	
  }

  setDefaultQuantity(){
    this.quantity = 1;
  }

  increaseQuantity(){
    debugger
    this.quantity += 1;
  }

  decreaseQuantity(){
    if(this.quantity > 1){
      this.quantity -= 1;
    }
  }

}
