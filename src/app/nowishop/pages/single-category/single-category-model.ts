export class SingleCategoryModel {
	DealSlug:any;
	PageSize:any;
	PageNumber:any;
	OrderBy:any;
	Order:any;

	constructor(){
		this.DealSlug = "";
		this.PageNumber = 1;
		this.PageSize = 18;
		this.OrderBy = "ModifiedDate";
		this.Order = "desc";
	}
}