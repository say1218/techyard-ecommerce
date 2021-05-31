import { Container, Typography, Button, Grid } from "@material-ui/core";
import useStyles from "./styles";
import CartItem from "./CartItem/CartItem";
import { Link } from "react-router-dom";

const Cart = ({ cart, updateCartQty, removeFromCart, emptyCart }) => {
	console.log(cart);
	const classes = useStyles();

	//function returning jsx
	const EmptyCart = () => (
		<Typography variant='subtittle1'>
			You have no items in youe shopping cart,
			<Link to='/'>start adding some</Link>
		</Typography>
	);

	const FilledCart = () => (
		<>
			<Grid container spacing={3}>
				{cart.line_items.map((item) => (
					<Grid item xs={12} sm={4} key={item.id}>
						<CartItem
							item={item}
							updateCartQty={updateCartQty}
							removeFromCart={removeFromCart}
						/>
					</Grid>
				))}
			</Grid>
			<div className={classes.cardDetails}>
				<Typography variant='h4'>
					Subtotal: {cart.subtotal.formatted_with_symbol}
				</Typography>
				<div>
					<Button
						className={classes.emptyButton}
						size='large'
						type='button'
						variant='contained'
						color='secondary'
						onClick={emptyCart}>
						Empty Cart
					</Button>

					<Button
						className={classes.checkoutButton}
						size='large'
						type='button'
						variant='contained'
						color='primary'
						component={Link}
						to='/checkout'>
						Checkout
					</Button>
				</div>
			</div>
		</>
	);

	if (!cart.line_items) return <p>Loading...</p>;

	return (
		<Container>
			<div className={classes.toolbar} />
			<Typography className={classes.title} varinat='h3'>
				Your Shopping Cart
			</Typography>
			{!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
		</Container>
	);
};

export default Cart;
