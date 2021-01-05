import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
    playIDInputRoot: {
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gridGap: 10,
        alignItems: "center",
        justifyItems: "center",
    },
    settingsSwitchRoot: {
        width: "max-content",
    }
}))