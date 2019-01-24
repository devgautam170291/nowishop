export class AdminSearchModal {
	ColumnName: any;
	Operator: any;
	ColumnValue: any;

	constructor(){
		this.ColumnName = 0;
		this.Operator = 0;
		this.ColumnValue = "";
	}
}

export class PaginationModal {
	PageSize: any;
	PageNumber: any;
	Order: any;
	OrderBy: any;

	constructor(){
		this.PageSize = 10;
		this.PageNumber = 1;
		this.Order = "UserId";
		this.OrderBy = "asc";
	}
}