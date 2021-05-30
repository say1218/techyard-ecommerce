import { Grid } from "@material-ui/core";
import Product from "./Product/Product";
import useStyles from "./styles";

const products = [
	{
		id: 1,
		name: "Macbook Air",
		description: "Macbook Air with M1",
		price: "$555",
		image:
			"https://www.apple.com/v/mac/home/be/images/overview/compare/compare_mba__gdncw5gbxoq6_large_2x.png",
	},
	{
		id: 2,
		name: "Macbook Pro",
		description: "Macbook Pro with M1",
		price: "$555",
		image:
			"https://www.apple.com/v/mac/home/be/images/overview/compare/compare_mbp13__geounnnz6oa6_large_2x.png",
	},
	{
		id: 3,
		name: "Macbook Pro",
		description: "Macbook Pro with M1",
		price: "$555",
		image:
			"https://www.apple.com/v/mac/home/be/images/overview/compare/compare_mbp13__geounnnz6oa6_large_2x.png",
	},
	{
		id: 4,
		name: "Macbook Pro",
		description: "Macbook Pro with M1",
		price: "$555",
		image:
			"https://www.apple.com/v/mac/home/be/images/overview/compare/compare_mbp13__geounnnz6oa6_large_2x.png",
	},
	{
		id: 5,
		name: "Macbook Pro",
		description: "Macbook Pro with M1",
		price: "$555",
		image:
			"https://www.apple.com/v/mac/home/be/images/overview/compare/compare_mbp13__geounnnz6oa6_large_2x.png",
	},
];
const Products = () => {
	const classes = useStyles();
	return (
		<main className={classes.root}>
			<Grid container justify='center' spacing={4}>
				{products.map((product) => (
					<Grid key={product.id} item xs={12} sm={6} md={4} lg={4}>
						<Product product={product}></Product>
					</Grid>
				))}
			</Grid>
		</main>
	);
};

export default Products;
