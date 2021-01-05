import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
	root: {
		"& > *": {
			marginTop: 10,
			marginBottom: 10,
		},
	},
	meEggs: {
		paddingTop: 8,
		paddingBottom: 8,
	},
	dailyCollection: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		border: "2px solid",
		borderColor: theme.palette.success.main,
		borderRadius: 8,
	},
	collected: {
		
	},
	img: {
		position: "relative",
	},
	gift: {
		width: 80,
	},
	check: {
		position: "absolute",
		left: 5,
		top: 5,
		width: 36,
	}
}))