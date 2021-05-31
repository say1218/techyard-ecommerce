import "./App.css";
import { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { Products, Navbar } from "./components";

function App() {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState({});

	useEffect(() => {
		fetchProducts();
		fetchCart();
	}, []);

	const fetchProducts = async () => {
		const { data } = await commerce.products.list();
		setProducts(data);
	};

	const fetchCart = async () => {
		const data = await commerce.cart.retrieve();
		console.log("fetch cart -->", data);
		setCart(data);
	};

	const addToCart = async (productId, quantity) => {
		const { cart } = await commerce.cart.add(productId, quantity);
		console.log("add to cart -->", cart);
		setCart(cart);
	};

	console.log("productas are:", products);

	return (
		<div>
			<Navbar totalItems={cart.total_items} />
			{products && <Products products={products} onAddToCart={addToCart} />}
		</div>
	);
}

export default App;
