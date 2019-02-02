export class SingleDealModel{
	PageSize:any;
	PageNumber:any;
	DealSlug:any;
	Search: any;

	constructor(){
		this.PageNumber = 1;
		this.PageSize = 3;
		this.DealSlug = "";
		this.Search = [new SearchParams()];
	}
}

export class SearchParams {
	ColumnName:any;
	Operator:any;
	ColumnValue:any;
	LogicalOperator:any;

	constructor(){
		this.ColumnName = "";
		this.Operator = "";
		this.ColumnValue = "";
		this.LogicalOperator = "";
	}
}