import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
    drawer: {
        maxWidth: "280px",
        width: "100vw",
    },
    drawerPaper: {
        maxWidth: "280px",
        width: "100vw",
        backgroundColor: theme.palette.background.paper,
    },
    toolbar: theme.mixins.toolbar,
    text: {
        margin: "0px 5px",
        textAlign: "right",
    },
    menuHeader: Object.assign(theme.mixins.toolbar, {
        backgroundColor: theme.palette.primary.main,
        display: "flex",
        flexGrow: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    }),
    itemActive: {
        "&> div": {
            backgroundColor: theme.palette.secondary.light,
        },
    },
}))