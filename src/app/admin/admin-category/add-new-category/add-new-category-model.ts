export class AddNewCategoryModel {
	CategoryName: any;
	CategoryDescription: any;
	ParentCategoryId: any;
	CategorySlug: any;
	CategoryId: any;
	CategoryImageUrl: any;
	IsRecommended: any;
	CreatedBy: any;
	CreatedDate: any;
	ModifiedBy: any;
	ModifiedDate: any;

	constructor(){
		this.CategoryName = "";
		this.CategoryDescription = "";
		this.ParentCategoryId = "0";
		this.CategorySlug = "";
		this.CategoryId = "0";
		this.CategoryImageUrl = "";
		this.IsRecommended = false;
		this.CreatedBy = "";
		this.CreatedDate = "";
		this.ModifiedBy = "";
		this.ModifiedDate = "";
	}
}