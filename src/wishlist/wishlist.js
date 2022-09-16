import { React, Component, useEffect, useState, useRef, useCallback } from "react";
import ProductCondensed from "../product_condensed/product_condensed";
import "./wishlist.css";

// SERVICES
import HttpService from "../services/http-service";
import NotificationService, { NOTIF_WISHLIST_CHANGED, REMOVED_FROM_WISHLIST } from "../services/notification-service";
import DataService from "../services/data-service";

const ht = new HttpService();
const ns = new NotificationService();
const ds = new DataService();

function WishList(props) {
	const inputRef = useRef(null);
	const [wishList, setWishList] = useState([]);

	// const loadWishList = () => {
	// 	ht.getData("http://localhost:3000/wishlists").then(
	// 		data => {
	// 			console.log(wishList);
	// 			setWishList(data);
	// 		},
	// 		err => {
	// 			console.log(err);
	// 		}
	// 	);
	// };

	const handleRemove = product => {
		// console.log("handling remove");
		ds.removeWishListItem(product);
		ns.postNotification(REMOVED_FROM_WISHLIST, product._id);
	};

	const createWishList = () => {
		const list = wishList.map(product => {
			return <ProductCondensed product={product} key={product._id} handleRemove={handleRemove} />;
		});
		return list;
	};

	useEffect(() => {
		ns.addObserver(NOTIF_WISHLIST_CHANGED, inputRef.current, data => {
			setWishList([...data]);
			console.log("data received", wishList);
		});
		return () => {
			console.log("component has unmounted!");
		};
	}, []);

	return (
		<div className="card" ref={inputRef.current}>
			<div className="card-block">
				<h4 className="card-title">Wish List</h4>
				<ul className="list-group">{createWishList()}</ul>
			</div>
		</div>
	);
}

export default WishList;
