import React from "react"
import { useTheme, makeStyles } from "@material-ui/core/styles"
import { Typography, IconButton } from "@material-ui/core"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { useDispatch } from "react-redux"
import { hideSidebar } from "../../actions/UIActions"

const useStyle = makeStyles(theme => ({
    root: Object.assign(theme.mixins.toolbar, {
        backgroundColor: theme.palette.primary.main,
        display: "flex",
        flexGrow: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    })
}))

export default function SidebarMenuHeader(props) {
    const classes = useStyle()
    const dispatch = useDispatch()
    const style = {
        root: {
            flexDirection: props.left ? null : "row-reverse",
        },
        icon: {
            transform:  props.left ? null : "scaleX(-1)",
        }
    }

    return (
        <div className={classes.root} style={style.root}>
            <Typography>
                
            </Typography>
            <IconButton onClick={() => dispatch(hideSidebar())} aria-label="Hide Menu">
                <ArrowBackIosIcon style={style.icon}/>
            </IconButton>
        </div>
    )
}