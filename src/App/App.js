import logo from "../logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

// Services
import HttpService from "../services/http-service";

// Components
import Product from "../product/product";
import WishList from "../wishlist/wishlist";

// Initialization
const http = new HttpService();

function App() {
	const [products, setProducts] = useState(MOCKDATA);

	// MOCK DATA
	const MOCKDATA = [
		{
			likes: 0,
			_id: "63093b543389962cc121fc5d",
			title: "Longboard",
			price: 75,
			imgUrl: "https://images.unsplash.com/photo-1529153510182-75ced468f736?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
		},
		{
			likes: 0,
			_id: "63093b543389962cc121fc5e",
			title: "Wheels",
			price: 20,
			imgUrl: "https://images.pexels.com/photos/5845029/pexels-photo-5845029.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
		},
		{
			likes: 0,
			_id: "63093b543389962cc121fc5f",
			title: "Skateboard",
			price: 50,
			imgUrl: "https://images.pexels.com/photos/165236/pexels-photo-165236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
		},
		{
			likes: 0,
			_id: "63093b553389962cc121fc60",
			title: "Autre",
			price: 15,
			imgUrl: "./public/images/miscellanious.jpg"
		}
	];

	// FETCH DATA FROM REAL API IF NEEDED
	const loadProducts = () => {
		http.getData("http://localhost:3000/products").then(
			data => {
				if (data && data.isArray()) {
					setProducts(data);
					console.log(products);
				} else {
					setProducts([...MOCKDATA]);
					console.log(products);
				}
			},
			err => {
				console.log("Unable to fetch product data from the API", err);
			}
		);
	};

	const productList = () => {
		const list = products.map(product => {
			return (
				<div className="col-sm-4 pad2x" key={product._id}>
					<Product product={product} />
				</div>
			);
		});
		return list;
	};

	// useEffect(() => {
	// 	loadProducts();
	// }, []);

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<h2> Welcome to The Swag Shop</h2>
			</header>
			<div className="container-fluid app_main">
				<div className="row mt-5">
					<div className="col-sm-8">
						<div className="row">{productList()}</div>
					</div>
					<div className="col-sm-4">
						<WishList />
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
