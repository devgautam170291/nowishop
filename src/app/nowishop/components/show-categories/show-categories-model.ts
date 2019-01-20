export class showCategoriesModel{
	PageSize:any;
	PageNumber:any;
	OrderBy:any;
	Order:any;

	constructor(){
		this.PageNumber = 1;
		this.PageSize = 3;
		this.OrderBy = "ModifiedDate";
		this.Order = "desc";
	}
}