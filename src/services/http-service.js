import "whatwg-fetch";

class HttpService {
	getData(url) {
		var promise = new Promise((resolve, reject) => {
			try {
				fetch(url).then(res => {
					resolve(res.json());
				});
			} catch (err) {
				console.log("Unable to fetch -", err);
				return;
			}
		});
		return promise;
	}

	// [ PRIMITIVE WAY TO FETCH DATA ]
	// getProducts = async () => {
	// 	const products = await fetch("http://localhost:3000/products");
	// 	return await products.json();
	// };
}

export default HttpService;
