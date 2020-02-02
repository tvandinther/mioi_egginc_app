import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import { toggleSidebar } from "../actions/UIActions"
import { IconButton } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    root: {
        padding: "0px 12px",
    },
    MenuButton: {
        transition: "all 300ms ease-out",

        "& div": {
            backgroundColor: theme.palette.primary.contrastText,
        },
    }
}))

export default function MenuButton(props) {
    const dispatch = useDispatch()
    const classes = useStyles()
    const barActiveStyles ={
        bar1: {
            transform: "translate(0%, 250%) rotate(-45deg)",
        },
        bar2: {
            opacity: 0,
        },
        bar3: {
            transform: "translate(0%, -250%) rotate(45deg)",
        },
    }

    return (
        <IconButton className={classes.root} onClick={() => dispatch(toggleSidebar())} edge={props.left ? "start" : "end"}>
            <div className={classes.MenuButton}>
                <div style={props.active ? barActiveStyles.bar1 : null} className="bar1"></div>
                <div style={props.active ? barActiveStyles.bar2 : null} className="bar2"></div>
                <div style={props.active ? barActiveStyles.bar3 : null} className="bar3"></div>
            </div>
        </IconButton>
    )
}