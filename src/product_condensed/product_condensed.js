import React from "react";
import "./product_condensed.css";

function ProductCondensed(props) {
	return (
		<li className="list-group-item" id={props.product._id}>
			<button
				className="btn btn-outline"
				onClick={() => {
					props.handleRemove(props.product);
				}}
			>
				X
			</button>
			<a className="btn btn-outline">
				{props.product.title} | <b>${props.product.price}</b>
			</a>
		</li>
	);
}

export default ProductCondensed;
