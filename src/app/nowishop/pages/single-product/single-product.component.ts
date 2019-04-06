import { WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit , Inject} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(@Inject(WINDOW) private window: Window, 
    private http: HttpClient, 
    private dataService: HttpService, 
    private route: ActivatedRoute,
    public nowishopGlobal: NowishopService,
    private router: Router
    ) {

    this.router.routeReuseStrategy.shouldReuseRoute = function(){
        return false;
     }
  }

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
    debugger
    var that = this;
    if(obj.featuredColor){
      if(obj.productVariation.length){
        obj.productVariation.forEach((data)=>{
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
      console.log('check variation Size');
      console.log(this.selectedSizeQuantity) ;  
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
       let state = this.router.routerState.snapshot;
      this.router.navigate(['/login'], { queryParams: { returnTo: state.url }});
    }
  }

  saveCartInfoLocally(addToCartModel){
    let userCart = [];
      if(this.nowishopGlobal.isInLocalStorage('user-cart')){
        userCart = this.nowishopGlobal.getFromLocalStorage('user-cart');        
      }
      
      userCart.push(addToCartModel);
      this.nowishopGlobal.setInLocalStorage('user-cart', userCart);
  }

  addToCart(){
    
    if(!this.nowishopGlobal.getUserInfo()){
      let state = this.router.routerState.snapshot;
      this.router.navigate(['/login'], { queryParams: { returnTo: state.url }});
    }
    else {
      if(this.productInfo){
        this.addToCartModel.ProductID = this.productInfo.productID;
        this.addToCartModel.ProductVariactionID = this.selectedVariation.ProductVariactionID;
        this.addToCartModel.ProductSizeID = this.selectedSizeQuantity ? this.selectedSizeQuantity.ProductSizeID : 0;
        
        // Save Cart Info Locally
        this.saveCartInfoLocally(this.addToCartModel)

        this.http.post(this.dataService.baseUrl + 'UserAccount/AddUserCard', this.addToCartModel).subscribe(
          res => {
            if(res['IsSuccess']){
              $(".alert").css("display", "block");
              this.window.setTimeout(function() {
                  $(".alert").fadeTo(500, 0).slideUp(500, function(){
                      $(this).css("display", "none");
                  });
              }, 2000);
            }
          }
        )
      }
    }    
  }

  buyItNow(){
    if(!this.nowishopGlobal.getUserInfo()){
      let state = this.router.routerState.snapshot;
      console.log('check-'+state.url );
      this.router.navigate(['/login'], { queryParams: { returnTo: state.url }});
    }
    else {
      if(this.productInfo){
        this.addToCartModel.ProductID = this.productInfo.productID;
        this.addToCartModel.ProductVariactionID = this.selectedVariation.ProductVariactionID;
        this.addToCartModel.ProductSizeID = this.selectedSizeQuantity ? this.selectedSizeQuantity.ProductSizeID : 0;
        
        // Save Cart Info Locally
        this.saveCartInfoLocally(this.addToCartModel)

        this.http.post(this.dataService.baseUrl + 'UserAccount/AddUserCard', this.addToCartModel).subscribe(
          res => {
            if(res['IsSuccess']){
              this.router.navigate(['shipping-payment']);
            }
          }
        )
      }
    }    
  }
}
