import NotificationService, { NOTIF_WISHLIST_CHANGED } from "./notification-service";

let ns = new NotificationService();

let instance = null;
var wishList = [];

class DataService {
	constructor() {
		if (!instance) {
			instance = this;
		}
		return instance;
	}

	getWishList() {
		return wishList;
	}

	setWishList(data) {
		wishList = data;
		// return true;
	}

	addWishListItem(item) {
		if (!wishList.includes(item)) {
			wishList.push(item);
			console.log(wishList);
		}
	}

	removeWishListItem(item) {
		for (let x = 0; x < wishList.length; x++) {
			if (item._id === wishList[x]._id) {
				wishList.splice(x, 1);
				// ns.postNotification(NOTIF_WISHLIST_CHANGED, wishList);
				break;
			}
		}
	}
}

export default DataService;
