import React, { useState, useEffect } from "react";
import {
	InputLabel,
	Select,
	MenuItem,
	Button,
	Grid,
	Typography,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "./CustomTextField";

import { commerce } from "../../lib/commerce";

const AddressForm = ({ checkOutToken }) => {
	const methods = useForm();

	const [shippingCountry, setShippingCountry] = useState("");
	const [shippingCountryArray, setShippingCountryArray] = useState([]);

	const [shippingSubdivision, setShippingSubdivision] = useState("");
	const [shippingSubdivisionArray, setShippingSubdivisionArray] = useState([]);

	const [shippingOption, setShippingOption] = useState("");
	const [shippingOptionArray, setShippingOptionArray] = useState([]);

	useEffect(() => {
		fetchShippingLocale();
	}, [checkOutToken]);

	useEffect(() => {
		if (shippingCountry) fetchShippingSubdivision(shippingCountry);
	}, [shippingCountry]);

	useEffect(() => {
		//not passing region, becos not applicable
		if (shippingCountry)
			fetchShippingOptions(checkOutToken.id, shippingCountry);
	}, [shippingCountry]);

	const fetchShippingLocale = async () => {
		let { countries } = await commerce.services.localeListShippingCountries(
			checkOutToken.id
		);
		setShippingCountryArray(countries);

		//since there is only one shipping country
		setShippingCountry(Object.keys(countries)[0]);
	};

	const fetchShippingSubdivision = async (shippingCountry) => {
		let { subdivisions } = await commerce.services.localeListSubdivisions(
			shippingCountry
		);
		console.log("subdivs", subdivisions);
		//setting the array for sleect dropdown
		setShippingSubdivisionArray(subdivisions);
		//setting the value for default value
		setShippingSubdivision(Object.keys(subdivisions)[0]);
		//fetchShippingOptions(checkOutToken.id, countryCode);
	};

	const fetchShippingOptions = async (tokenId, country, region = null) => {
		let options = await commerce.checkout.getShippingOptions(tokenId, {
			country,
			region,
		});
		setShippingOptionArray(options);
		setShippingOption(options[0]);
		console.log("shipping options", options);
	};

	const submitForm = () => {
		console.log("submitting form");
	};

	return (
		<>
			<Typography variant='h6' gutterBottom>
				Shipping address
			</Typography>
			<FormProvider {...methods}>
				<form onSubmit={submitForm}>
					<Grid container spacing={3}>
						<FormInput required name='firstName' label='First name' />
						<FormInput required name='lastName' label='Last name' />
						<FormInput required name='address1' label='Address line 1' />
						<FormInput required name='email' label='Email' />
						<FormInput required name='city' label='City' />
						<FormInput required name='zip' label='Zip / Postal code' />
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Subdivision</InputLabel>
							<Select
								value={shippingSubdivision}
								fullWidth
								onChange={(e) => setShippingSubdivision(e.target.value)}>
								{Object.entries(shippingSubdivisionArray)
									.map(([code, name]) => ({ id: code, label: name }))
									.map((item) => (
										<MenuItem key={item.id} value={item.id}>
											{item.label}
										</MenuItem>
									))}
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Options</InputLabel>
							<Select
								value={shippingOption}
								fullWidth
								onChange={(e) => setShippingOption(e.target.value)}>
								{shippingOptionArray
									.map((sO) => ({
										id: sO.id,
										label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
									}))
									.map((item) => (
										<MenuItem key={item.id} value={item.id}>
											{item.label}
										</MenuItem>
									))}
							</Select>
						</Grid>
					</Grid>
				</form>
			</FormProvider>
		</>
	);
};

export default AddressForm;
