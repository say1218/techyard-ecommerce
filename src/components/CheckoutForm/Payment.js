import React from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import {
	Elements,
	CardElement,
	ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Review from "./Review";

const PaymentForm = ({ checkOutToken }) => {
	console.log("in review", checkOutToken);

	return (
		<>
			<Review checkOutToken={checkOutToken} />
			<Divider />
			<Typography variant='h6' gutterBottom style={{ margin: "20px 0" }}>
				Payment method
			</Typography>
		</>
	);
};

export default PaymentForm;
