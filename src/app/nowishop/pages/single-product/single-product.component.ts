import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../services/http.service';
import { NowishopService } from '../../../services/nowishop.service';
import { AddToCart } from './single-product-model';
declare let $: any;

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  constructor(
    private http: HttpClient, 
    private dataService: HttpService, 
    private route: ActivatedRoute,
    private nowishopGlobal: NowishopService
    ) { }

  breedcrumb: any;
  productInfo: any = {};
  wishlist: any = true;
  productMoreInfo: any = [];
  sliderImages: any = [];
  addToCartModel: any;  
  loadDummy: any = true;
  selectedVariation: any;
  selectedSizeQuantity: any;
  similarProductCategorySlug: any = null;

  ngOnInit() {
    this.loadModel();
    this.getProductInfo(); 
  }

  loadModel(){
    this.addToCartModel = new AddToCart(this.nowishopGlobal);
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
        "name": this.productInfo['productName'] ? this.productInfo['productName'] : 'Product Name Loading...',
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
            this.showBreedcrumb();
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
    if(obj.variationSizes.length){
      this.selectedSizeQuantity = obj.variationSizes[0];
    }
    
  	if(e){
  		$(e.target).closest('.product-variations').find('li').each(function(){
  			$(this).removeClass('active');
	  	})
	  	$(e.target).closest('li').addClass('active');
  	}  	
  }

  changeVariationSize(variation, size, e){
    this.selectedSizeQuantity = size;
    if(e){
      $(e.target).closest('.available-size').find('li').each(function(){
        $(this).removeClass('active');
      })
      $(e.target).closest('li').addClass('active');
    } 
  }

  increaseQuantity(){
    this.addToCartModel.ProductCount += 1;
  }

  decreaseQuantity(){
    if(this.addToCartModel.ProductCount > 1){
      this.addToCartModel.ProductCount -= 1;
    }
  }

}
