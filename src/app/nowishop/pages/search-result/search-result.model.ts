export class SearchResultModel{
	SearchBar: any;
	ProductList: any;
	PageSize:any;
	PageNumber:any;
	Search: any;

	constructor(){
		this.PageNumber = 1;
		this.ProductList = "";
		this.PageSize = 3;
		this.SearchBar = "";
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