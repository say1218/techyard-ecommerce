import { useState, useEffect } from "react";
import {
	CssBaseline,
	Paper,
	Stepper,
	Step,
	StepLabel,
	Typography,
	CircularProgress,
	Divider,
	Button,
} from "@material-ui/core";
import useStyles from "./styles";
import AddressForm from "../Address";
import PaymentForm from "../Payment";
import { commerce } from "../../../lib/commerce";
import { Link } from "react-router-dom";

const steps = ["Shipping address", "Payment details"];

const Checkout = ({ cart, order, error, handleCaptureCheckout }) => {
	const classes = useStyles();
	const [activeStep, setActiveStep] = useState(0);
	const [checkOutToken, setCheckOutToken] = useState(null);
	const [shippingData, setShippingData] = useState({});

	useEffect(() => {
		console.log("cart is", cart);
		const generateToken = async () => {
			try {
				let token = await commerce.checkout.generateToken(cart.id, {
					type: "cart",
				});
				console.log("token is", token);
				setCheckOutToken(token);
			} catch (error) {}
		};
		generateToken();
	}, [cart]);
	//putting in cart in depenedency because token needs to be generated everytime cart changes

	const nextStep = () => {
		setActiveStep((prevValue) => prevValue + 1);
	};

	const backStep = () => {
		setActiveStep((prevValue) => prevValue - 1);
	};

	const saveShippingData = (shippingObj) => {
		setShippingData(shippingObj);
		nextStep();
	};

	//function returning jsx, will be used as element in return
	const Form = () =>
		activeStep === 0 ? (
			<AddressForm checkOutToken={checkOutToken} next={saveShippingData} />
		) : (
			<PaymentForm
				checkOutToken={checkOutToken}
				shippingData={shippingData}
				nextStep={nextStep}
				backStep={backStep}
				onCaptureCheckout={handleCaptureCheckout}
			/>
		);

	let Confirmation = () =>
		order.customer ? (
			<>
				<div>
					<Typography variant='h5'>
						Thank you for your purchase, {order.customer.firstname}{" "}
						{order.customer.lastname}!
					</Typography>
					<Divider className={classes.divider} />
					<Typography variant='subtitle2'>
						Order ref: {order.customer_reference}
					</Typography>
				</div>
				<br />
				<Button component={Link} variant='outlined' type='button' to='/'>
					Back to home
				</Button>
			</>
		) : (
			<div className={classes.spinner}>
				<CircularProgress />
			</div>
		);

	return (
		<>
			<CssBaseline />
			<div className={classes.toolbar} />
			<main className={classes.layout}>
				<Paper classname={classes.paper}>
					<Typography variant='h4' align='center'>
						Checkout
					</Typography>
					<Stepper activeStep={activeStep} className={classes.stepper}>
						{steps.map((step) => (
							<Step key={step}>
								<StepLabel>{step}</StepLabel>
							</Step>
						))}
					</Stepper>
					{activeStep === steps.length ? (
						<Confirmation />
					) : (
						//this is because the form depends on the checkout token
						checkOutToken && <Form></Form>
					)}
				</Paper>
			</main>
		</>
	);
};

export default Checkout;
