export class SingleCategoryModel{
	PageSize:any;
	PageNumber:any;
	CategorySlug:any;
	Search: any;

	constructor(){
		this.PageNumber = 1;
		this.PageSize = 3;
		this.CategorySlug = "";
		this.Search = [];
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