export class SimilarProductModel {
	"CategorySlug": any;
	"PageSize": any;
	"PageNumber": any;
	"Search": any;

	constructor(){
		this.CategorySlug = "";
		this.PageSize = 4;
		this.PageNumber = 1;
		this.Search = [];
	}
}