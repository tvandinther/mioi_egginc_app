import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
	root: {
		display: "grid",
		gridTemplateColumns: "1fr 1fr 1fr",
		gridTemplateAreas: `
			"back-button back-button back-button"
			"image image image"
			"title title title"
			"description description description"
			"icons icons icons"
			"search search search"
			"coop coop coop"
			"calc calc calc"
		`,
		gridColumnGap: "10px",
		gridRowGap: "15px",
		alignItems: "center",
		margin: 25,
		padding: 25,

		"@media (max-width: 840px)": {
			margin: "16px 8px",
			paddingLeft: 16,
			paddingRight: 16,
		}
	},

	// SEARCH

	search: {
        display: "grid",
        margin: "5px",
        gridTemplate: "1fr / 1fr 100px",
        gridGap: "10px",
    },
    progress: {
        position: "absolute",
    },
}))