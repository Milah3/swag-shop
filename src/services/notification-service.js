export const NOTIF_WISHLIST_CHANGED = "notif_wishlist_changed";
export const REMOVED_FROM_WISHLIST = "removed_from_wishlist";

var observers = {};
let instance = null;

class NotificationService {
	constructor() {
		if (!instance) {
			instance = this;
		}
		return instance;
	}

	getObservers() {
		return observers;
	}
	addObserver = (notificationName, observer, callBack) => {
		let obs = observers[notificationName];

		if (!obs) {
			observers[notificationName] = [];
		}

		let obj = { observer: observer, callBack: callBack };
		observers[notificationName].push(obj);
	};

	removeObserver = (notificationName, observer) => {
		let obs = observers[notificationName];

		if (obs) {
			for (var x = 0; x < obs.length; x++) {
				if (observer === obs[x].observer) {
					obs.splice(x, 1);
					observer[notificationName] = obs;
					break;
				}
			}
		}
	};

	postNotification = (notificationName, data) => {
		let obs = observers[notificationName];

		for (var x = 0; x < obs.length; x++) {
			var obj = obs[x];
			obj.callBack(data);
		}
	};
}

export default NotificationService;
