import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
	flex: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-evenly",
		alignItems: "center",
	},
	section: {
		flexGrow: 1,
		margin: 10,
		padding: 10,
		borderWidth: 1,
		borderStyle: "solid",
		borderRadius: 8,
		borderColor: theme.palette.augmentColor(theme.palette.grey).main
	},

	// TARGET INPUT

	selector: {
        width: "100%",
        overflow: "hidden",
    },
    selectorItem: {
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gridGap: 5,
        alignItems: "center",
    },
    image: {
        height: 36,
        width: "auto",
	},
	
	// GENERIC INPUT

	input: {
		textAlign: "right",
		paddingRight: 24,
	},
}))