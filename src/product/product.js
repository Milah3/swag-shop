import { React, Component, useEffect, useState, useRef } from "react";
import "./product.css";
import NotificationService, { NOTIF_WISHLIST_CHANGED, REMOVED_FROM_WISHLIST } from "../services/notification-service";
import DataService from "../services/data-service";
import WishList from "../wishlist/wishlist";

const notify = new NotificationService();
const ds = new DataService();

function Product(props) {
	const [subText, setText] = useState("Add To WishList");
	const [onWishList, setOnWishList] = useState(false);
	const inputRef = useRef(null);

	function onButtonClicked() {
		switch (onWishList) {
			case true:
				ds.removeWishListItem(props.product);
				setOnWishList(false);
				setText("Add to WishList");
				inputRef.current.classList.remove("wishlisted");
				break;
			case false:
				ds.addWishListItem(props.product);
				setOnWishList(true);
				setText("In WishList");
				inputRef.current.classList.add("wishlisted");
				console.log(inputRef.current);
				break;
			default:
				console.log("Error adding / removing to wishList. There may be data inaccuracy.");
				break;
		}
	}

	useEffect(() => {
		// INITIALIZE EACH PRODUCT AS AN OBSERVER TO LISTEN FOR CHANGE
		const refre = inputRef.current;
		notify.addObserver(NOTIF_WISHLIST_CHANGED, refre, () => {});

		notify.addObserver(REMOVED_FROM_WISHLIST, refre, item => {
			// TBD
			if (props.product._id === item) {
				setOnWishList(false);
				setText("Add to WishList");
				inputRef.current.classList.remove("wishlisted");
			}
		});

		return () => {
			notify.removeObserver(NOTIF_WISHLIST_CHANGED, refre);
		};
	}, []);

	return (
		<div className="card product">
			<img className="card-img-top" alt="Product" src={props.product.imgUrl}></img>
			<div className="card-block">
				<h4 className="card-title">{props.product.title}</h4>
				<p className="card-text">Price: ${props.product.price}</p>
				<a className="btn btn-primary" onClick={() => onButtonClicked()} ref={inputRef}>
					{/* Add to Wishlist */}
					{/* You could have used a tertiary operation here, Jimbo. : Ex: (onWishlist === true ? "Remove from Wishlist" : "Add to Wishlist") */}
					{subText}
				</a>
			</div>
		</div>
	);
}

export default Product;
