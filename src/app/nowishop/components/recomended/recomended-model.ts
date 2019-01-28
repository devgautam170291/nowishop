export class RecommendedModel{
	PageSize:any;
	PageNumber:any;
	Search: any;

	constructor(){
		this.PageNumber = 1;
		this.PageSize = 1;
		this.Search = [new SearchParams()];
	}
}

class SearchParams {
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