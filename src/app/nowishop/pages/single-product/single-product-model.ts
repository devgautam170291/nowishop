
export class AddToCart {
	"UserID":any;
	"ProductID":any;
	"ProductVariactionID":any;	
	"ProductSizeID":any;
	"ProductCount":any;

	constructor(nowishopGlobal){
		this.UserID = this.setUserId(nowishopGlobal);
		this.ProductID = 0;
		this.ProductVariactionID = 0;
		this.ProductSizeID = 0;
		this.ProductCount = 1;
	}

	setUserId(nowishopGlobal){
		if(nowishopGlobal.isUserInfo){
			var userInfo = nowishopGlobal.getUserInfo();
			return userInfo.userId;
		}
		return 0;
	}
}