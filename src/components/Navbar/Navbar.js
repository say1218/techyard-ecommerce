import {
	AppBar,
	Toolbar,
	IconButton,
	Badge,
	MenuItem,
	Menu,
	Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { Link } from "react-router-dom";

import logo from "../../assets/laptop.svg";
import useStyles from "./styles";

const Navbar = ({ totalItems }) => {
	const classes = useStyles();
	return (
		<>
			<AppBar position='fixed' className={classes.appBar} color='inherit'>
				<Toolbar>
					<Typography
						component='Link'
						to='/'
						variant='h6'
						className={classes.title}
						color='inherit'>
						<img
							src={logo}
							alt='iStore'
							height='25px'
							className={classes.image}
						/>
						TechYard
					</Typography>
					<div className={classes.grow}></div>
					<div className={classes.button}>
						{/* <Link to='/cart'> */}
						<IconButton
							component={Link}
							to='/cart'
							aria-label='Show Cart Items'
							color='inherit'>
							<Badge badgeContent={totalItems} color='secondary'>
								<ShoppingCart></ShoppingCart>
							</Badge>
						</IconButton>
						{/* </Link> */}
					</div>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default Navbar;
