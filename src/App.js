import "./App.css";
import { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart, Checkout } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState({});
	const [order, setOrder] = useState({});
	const [errorMessage, setErrorMessage] = useState("");

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

	const updateCartQty = async (lineItemId, quantity) => {
		const response = await commerce.cart.update(lineItemId, { quantity });
		setCart(response.cart);
	};

	const removeFromCart = async (lineItemId) => {
		const response = await commerce.cart.remove(lineItemId);
		setCart(response.cart);
	};

	const emptyCart = async () => {
		const response = await commerce.cart.empty();
		setCart(response.cart);
	};

	const refreshCart = async () => {
		const newCart = await commerce.cart.refresh();
		setCart(newCart);
	};

	const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
		try {
			const incomingOrder = await commerce.checkout.capture(
				checkoutTokenId,
				newOrder
			);

			setOrder(incomingOrder);

			refreshCart();
		} catch (error) {
			setErrorMessage(error.data.error.message);
		}
	};

	console.log("productas are:", products);

	return (
		<Router>
			<Navbar totalItems={cart.total_items} />
			<Switch>
				<Route exact path='/'>
					<Products products={products} onAddToCart={addToCart} />
				</Route>
				<Route exact path='/cart'>
					<Cart
						cart={cart}
						updateCartQty={updateCartQty}
						removeFromCart={removeFromCart}
						emptyCart={emptyCart}
					/>
				</Route>
				<Route exact path='/checkout'>
					<Checkout
						cart={cart}
						order={order}
						error={errorMessage}
						handleCaptureCheckout={handleCaptureCheckout}
					/>
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
