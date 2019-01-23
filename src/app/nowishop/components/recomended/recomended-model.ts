export class RecommendedModel{
	PageSize:any;
	PageNumber:any;
	OrderBy:any;
	Order:any;

	constructor(){
		this.PageNumber = 1;
		this.PageSize = 1;
		this.OrderBy = "ModifiedDate";
		this.Order = "desc";
	}
}