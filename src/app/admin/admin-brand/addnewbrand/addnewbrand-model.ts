export class AddNewBrandModel {
	BrandName: any;
	CreatedBy: any;
	BrandDescription: any;
	brandCategories: Array<BrandCategories>;

	constructor(){
		this.BrandName = "";
		this.CreatedBy = "";
		this.BrandDescription = "";
		this.brandCategories = [];
	}
}

export class BrandCategories {
	"CategoryID": any;
	"CategoryName": any;

	constructor(){
		this.CategoryID = "";
		this.CategoryName = "";
	}
}