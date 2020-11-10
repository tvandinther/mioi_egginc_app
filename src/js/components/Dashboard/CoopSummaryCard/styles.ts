import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
	card: {
        display: "grid",
        gridTemplateColumns: "70px 1fr 1fr",
        gridTemplateAreas: `
            "image subtitle subtitle"
            "icons icons icons"
            "rewards rewards rewards"
            "estimate estimate estimate"
        `,
        gridGap: 10,
		alignItems: "center",
		wordBreak: "break-word",
	},
    image: {
        gridArea: "image",
        width: 80,
    },
}))