import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField, Grid } from "@material-ui/core";

const FormInput = ({ required, name, label }) => {
	const { control } = useFormContext();
	//label had to be included separately because react-hooks-form has not considered it to be a part of fields
	return (
		<Grid item xs={12} sm={6}>
			<Controller
				rules={{ required: required }}
				name={name}
				label={label}
				control={control}
				fullWidth
				render={({ field }) => (
					<TextField label={label} required={required} {...field} />
				)}
			/>
		</Grid>
	);
};

export default FormInput;
