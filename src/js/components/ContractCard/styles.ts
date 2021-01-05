import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
	root: {
        display: "grid",
        margin: "12px 15px 12px 15px",
        gridTemplateRows: "40px 5px 1fr",
        gridTemplateColumns: "100%",
        gridTemplateAreas: `
            "title title"
            "progressBar progressBar"
        `,
        justifyContent: "center",
        alignItems: "center",
        transition: "all 200ms ease",
        cursor: "pointer",
        userSelect: "none",
    },
	
	// BODY

	body: {
		display: "flex",
	},

	// HEADER

	header: {
		gridArea: "title",
		backgroundColor: theme.palette.primary.main,
		height: "100%",
	},
	title: {
		margin: 10,
		fontSize: 20,
		color: "white",
	},

	// IMAGE

	image: {
        backgroundColor: theme.palette.background.off,
        gridArea: "image",
		width: "100%",
		maxWidth: 150,
        display: "grid",
        alignItems: "center",
        justifyItems: "center",
        borderBottomLeftRadius: "inherit",
        zIndex: 3,
        filter: "drop-shadow(2px 0px 2px rgba(0, 0, 0, 0.3))",

        "& img": {
            maxHeight: "90%",
            maxWidth: "90%",
        }
	},

	// DETAILS

	details: {
        flexGrow: 1,
        padding: "10px",
	},
	icons: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
	},

	// REWARDS

	reward: {
		display: "flex",
		flex: "1 1 0px",

		"& > *": {
			margin: 2,
			flexGrow: 1,
		}
	},
	rewardSet: {
		marginTop: 5,
		
		"& .header": {
			paddingLeft: 5,
			backgroundColor: theme.palette.grey[700],
			color: theme.palette.getContrastText(theme.palette.grey[700]),
		}
	},
	quantityText: {
		...theme.typography.h6,
		marginLeft: 5,
	},
	rewardItem: {
        display: "flex",
		margin: "5px 0px",
        gridTemplateColumns: "auto 1fr",
    },
    rewardIcon: {
        width: "32px",
        height: "32px",
	},

	// PROGRESS BAR

	unfilled: {
        gridArea: "progressBar",
        backgroundColor: theme.palette.background.off,
        position: "relative",
        textAlign: "center",
        height: "100%",
        width: "100%",
        zIndex: 4,
        transition: "all 200ms ease",
        overflow: "hidden",

        "& *": {
            transition: "inherit",
        }
    },
    filled: {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -1,
        width: "100%",
        height: "100%",
	},
	expiryText: {
		lineHeight: "unset",
	}
}))