import { useState } from "react";
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

const steps = ["Shipping address", "Payment details"];

const Checkout = () => {
	const classes = useStyles();
	const [activeStep, setActiveStep] = useState(2);

	//function returning jsx, will be used as element in return
	const Form = () => (activeStep === 0 ? <AddressForm /> : <PaymentForm />);

	const Confirmation = () => <div>Confirmation</div>;

	return (
		<>
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
					{activeStep === steps.length ? <Confirmation /> : <Form></Form>}
				</Paper>
			</main>
		</>
	);
};

export default Checkout;
