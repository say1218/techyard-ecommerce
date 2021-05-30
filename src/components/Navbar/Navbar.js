import useStyles from "./styles";

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
import logo from "../../assets/laptop.svg";

const Navbar = () => {
	const classes = useStyles();
	return (
		<>
			<AppBar position='fixed' className={classes.appBar} color='inherit'>
				<Toolbar>
					<Typography>
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
						<IconButton aria-label='Show Cart Items' color='inherit'>
							<Badge bagdeContent={2} color='secondary'>
								<ShoppingCart></ShoppingCart>
							</Badge>
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default Navbar;
