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
import { Link } from "react-router-dom";

import { commerce } from "../../lib/commerce";

const AddressForm = ({ checkOutToken, next }) => {
	const methods = useForm();

	const [shippingCountry, setShippingCountry] = useState("");
	const [shippingCountryArray, setShippingCountryArray] = useState([]);

	const [shippingSubdivision, setShippingSubdivision] = useState("");
	const [shippingSubdivisionArray, setShippingSubdivisionArray] = useState([]);

	const [shippingOption, setShippingOption] = useState("");
	const [shippingOptionArray, setShippingOptionArray] = useState([]);

	useEffect(() => {
		console.log("first useeffect to fetch countries");
		fetchShippingCountries(checkOutToken.id);
	}, []);

	useEffect(() => {
		console.log("secind useeffect to fetch states");
		if (shippingCountry) fetchShippingSubdivision(shippingCountry);
	}, [shippingCountry]);

	useEffect(() => {
		console.log("third useeffect to fetch charges" + shippingCountry);
		if (shippingSubdivision)
			fetchShippingOptions(
				checkOutToken.id,
				shippingCountry,
				shippingSubdivision
			);
	}, [checkOutToken, shippingCountry, shippingSubdivision]);

	const fetchShippingCountries = async (checkOutTokenId) => {
		console.log("in fetch shipping locale id is--> " + checkOutTokenId);
		const { countries } = await commerce.services.localeListShippingCountries(
			checkOutTokenId
		);

		console.log("shipping cpountries", countries);
		setShippingCountryArray(countries);
		//since there is only one shipping country
		setShippingCountry(Object.keys(countries)[0]);
	};

	const fetchShippingSubdivision = async (shippingCountry) => {
		let { subdivisions } = await commerce.services.localeListSubdivisions("IN");
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
		setShippingOption(options[0].id);
		console.log("shipping options", options);
	};

	return (
		<>
			<Typography variant='h6' gutterBottom>
				Shipping address
			</Typography>
			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit((data) =>
						next({
							...data,
							shippingCountry,
							shippingSubdivision,
							shippingOption,
						})
					)}>
					<Grid container spacing={3}>
						<FormInput name='firstName' label='First name' />
						<FormInput name='lastName' label='Last name' />
						<FormInput name='address1' label='Address line 1' />
						<FormInput name='email' label='Email' />
						<FormInput name='city' label='City' />
						<FormInput name='zip' label='Zip / Postal code' />
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
					<br />
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<Button component={Link} variant='outlined' to='/cart'>
							Back to Cart
						</Button>
						<Button type='submit' variant='contained' color='primary'>
							Next
						</Button>
					</div>
				</form>
			</FormProvider>
		</>
	);
};

export default AddressForm;
