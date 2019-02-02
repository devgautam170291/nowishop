import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
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
    private nowishopGlobal: NowishopService,
    private router: Router,
    private state: RouterStateSnapshot
    ) { }

  breedcrumb: any;
  productInfo: any = {};
  productMoreInfo: any = [];
  sliderImages: any = [];
  addToCartModel: any;  
  loadDummy: any = true;
  selectedVariation: any;
  selectedSizeQuantity: any;
  similarProductCategorySlug: any = null;
  wishlist: any = false;

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
        "name": this.productInfo['productCategoryName'] ? this.productInfo['productCategoryName'] : 'Product Category Loading...',
        "url": this.productInfo['productCategorySlug'] ? '/category/'+this.productInfo['productCategorySlug']: '#',
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
            console.log('check response');
            console.log(this.productInfo);
            this.showBreedcrumb();
  					this.productMoreInfo = JSON.parse(this.productInfo.more_Data);
            this.checkFeaturedVariation(this.productInfo);
            this.checkWishlist(this.productInfo.productID);
  					this.loadDummy = false;
  				}
  			}
  		)
  	}
  }

  checkFeaturedVariation(obj){
    var that = this;
    if(obj.featuredColor){
      if(obj.productVariation.length){
        obj.productVariation.forEach((data)=>{
          debugger
          if(data.variationColor.toLowerCase() == obj.featuredColor.toLowerCase()){
            that.setVariation(data);
            return false;
          }
        })
      }
    }
  }

  setVariation(obj, e = null){
    debugger
  	this.selectedVariation = obj;
    this.sliderImages = obj.UploadedImages;
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

  checkWishlist(productId){
    if(this.nowishopGlobal.isUserInfo()){
      var userId = this.nowishopGlobal.getUserInfo().userId;
      this.http.get(this.dataService.baseUrl + 'Home/SingleProductWishList/' + productId + '/' + userId).subscribe(
        res => {
          if(res['Data'] == true){
            this.wishlist = true;
          }
        }
      )
    }
  }

  addRemoveWishlist(productId){
    if(this.nowishopGlobal.isUserInfo()){
      var userId = this.nowishopGlobal.getUserInfo().userId;
      if(this.wishlist){
        this.http.get(this.dataService.baseUrl + 'UserAccount/RemoveWishList/'+ userId + '/' + productId).subscribe(
          res => {
            if(res['IsSuccess']){
              this.wishlist = false;
            }
          }
        )
      }
      else{
        this.http.get(this.dataService.baseUrl + 'UserAccount/AddWishList/'+ userId + '/' + productId).subscribe(
          res => {
            if(res['IsSuccess']){
              this.wishlist = true;
            }
          }
        )
      }
    }
    else {
      this.router.navigate(['/login'], { queryParams: { returnTo: this.state.url }});
    }
  }

  addToCart(){
    
    if(this.productInfo){
      this.addToCartModel.ProductID = this.productInfo.productID;
      this.addToCartModel.ProductVariactionID = this.selectedVariation.ProductVariactionID;
      this.addToCartModel.ProductSizeID = this.selectedSizeQuantity.length ? this.selectedSizeQuantity.ProductSizeID : 0;
    
      this.http.post(this.dataService.baseUrl + 'UserAccount/AddUserCard', this.addToCartModel).subscribe(
        res => {
          if(res['IsSuccess']){
            alert('added');
          }
        }
      )
    }
  }

}
