import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
	root: {
		display: "flex",
		flexDirection: "column",
		position: "relative",

		"&>*": {
			marginTop: 10,
			marginBottom: 10,
		}
	},
	type: {
		margin: 0,
		position: "relative",
	},

	// SHARE

	share: {
		marginLeft: 8,
	},

	// EXPIRY ESTIMATE

	expiryEstimate: {
        backgroundColor: theme.palette.background.paper,
        border: 1,
        borderStyle: "none",
        borderColor: theme.palette.grey[300],
        borderRadius: 10,
		margin: "10px 0px",
		display: "block",
	},
	mainExpiryEstimate: {
		position: "relative",
		borderRadius: "inherit",
	},
    divider: {
		position: "absolute",
		width: 2,
		height: "100%",
		left: "calc(50% - 1px)",
        zIndex: 10,
        backgroundColor: theme.palette.secondary.main,
        boxShadow: theme.shadows[4],
    },
    progress: {
		clear: "both",
        height: 30,

        "& div": {
            borderRadius: "unset !important",

            "& div": {
                borderRadius: "unset !important",
            }
        }
	},
    estimate: {
		textAlign: "left",
		float: "left",
		maxWidth: "45%",
        marginLeft: 10,
    },
    expiry: {
		textAlign: "right",
		float: "right",
		maxWidth: "45%",
        marginRight: 10,
	},
	title: {
		
	},
	value: {
		
	},
    overlay: {
		position: "absolute",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: "100%",
		width: "100%",
        borderRadius: "inherit",
        backgroundColor: theme.palette.background.offOverlay,
        zIndex: 99,
	},
	tip: {
		clear: "both",
	}
}))