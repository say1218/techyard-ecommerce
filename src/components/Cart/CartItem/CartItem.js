import {
	Typography,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
} from "@material-ui/core";
import useStyles from "./styles";

const CartItem = ({ item, updateCartQty, removeFromCart }) => {
	const classes = useStyles();

	return (
		<Card className='cart-item'>
			<CardMedia
				image={item.media.source}
				alt={item.name}
				className={classes.media}
			/>
			<CardContent className={classes.cardContent}>
				<Typography variant='h4'>{item.name}</Typography>
				<Typography variant='h5'>
					{item.line_total.formatted_with_symbol}
				</Typography>
			</CardContent>
			<CardActions className={classes.cardActions}>
				<div className={classes.buttons}>
					<Button
						type='button'
						size='small'
						onClick={() => {
							updateCartQty(item.id, --item.quantity);
						}}>
						-
					</Button>
					<Typography>&nbsp;{item.quantity}&nbsp;</Typography>
					<Button
						type='button'
						size='small'
						onClick={() => {
							updateCartQty(item.id, ++item.quantity);
						}}>
						+
					</Button>
				</div>
				<Button
					variant='contained'
					type='button'
					color='secondary'
					onClick={() => {
						removeFromCart(item.id);
					}}>
					Remove
				</Button>
			</CardActions>
		</Card>
	);
};

export default CartItem;
