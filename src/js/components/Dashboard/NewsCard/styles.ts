import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
	markdown: {
		whiteSpace: "pre-line",

		"& a": {
			color: theme.palette.info.dark,

			"&:hover": {
				color: theme.palette.info.main,
			},
		}
	}
}))