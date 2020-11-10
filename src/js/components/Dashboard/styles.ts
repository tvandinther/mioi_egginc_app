import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
	root: {
        gridGap: 20,
        padding: "10px 0px",
    },
    column: {
        display: "flex",
        flexDirection: "column",
        "& >*": {
            margin: "10px 0px"
        },
    }
}))