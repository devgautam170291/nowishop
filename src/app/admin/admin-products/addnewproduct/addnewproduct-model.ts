export class AddProductModal {
	"ProductID": any;
	"ProductName": any;
	"ProductDescription": any;
	"SkuDetails": any;
	"More_Data": "";
	"ProductCategoryId": any;
	"product_Variations": Array<ProductVariation>;
	"FeaturedColor": any;
	"SelectedDeal": any;
	"IsRecommended": any;
	"BrandID": any;

	constructor(){
		this.ProductID = 0;
		this.ProductName = "";
		this.ProductDescription = "";
		this.SkuDetails = "";
		this.More_Data = "";
		this.ProductCategoryId = "0";
		this.product_Variations = [ new ProductVariation() ];
		this.FeaturedColor = "0";
		this.SelectedDeal = "0";
		this.IsRecommended = false;
		this.BrandID = "0";
	}
}

export class ProductVariation {
	"Color": any;
	"size_Quantities": Array<SizeQuantity>;
	"uploadedImages": Array<ImagePath>;

	constructor(){
		this.Color = "";
		this.size_Quantities = [ new SizeQuantity() ];
		this.uploadedImages = [  ];
	}
}

export class SizeQuantity {
	"Size": any;
	"Quantity": any;
	"Price": any;
	"DiscountedPrice": any;

	constructor(){
		this.Size = "";
		this.Quantity = "";
		this.Price = "";
		this.DiscountedPrice = "";
	}
}

export class ImagePath {
	"name": any;
	"url": any;
	"IsFeatured_VariationImage": any
	constructor(){
		this.name = "";
		this.url = "";
		this.IsFeatured_VariationImage = false;
	}
}
