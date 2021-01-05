import React from "react"
import {useDispatch} from "react-redux"
import {makeStyles, useTheme} from "@material-ui/core/styles"
import {toggleSidebar} from "../actions/UIActions"
import {IconButton} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    root: {
        padding: "unset",
    },
    MenuButton: {
        transition: "all 300ms ease-out",
    },
    bar: {
        width: 35,
        height: 4,
        borderRadius: 2,
        backgroundColor: theme.palette.primary.contrastText,
        margin: "6px 0px",
        transition: "0.4s",
    }
}))

export default function MenuButton(props: { active: boolean }) {
    const dispatch = useDispatch()
    const classes = useStyles()
    const theme = useTheme()
    const styles = {
        visibility: window.innerWidth < theme.breakpoints.values.md ? "visible" : "hidden",
    }
    const barActiveStyles = {
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
        <IconButton className={classes.root} onClick={() => dispatch(toggleSidebar())} aria-label="Menu">
            <div className={classes.MenuButton}>
                <div style={props.active ? barActiveStyles.bar1 : undefined} className={classes.bar}/>
                <div style={props.active ? barActiveStyles.bar2 : undefined} className={classes.bar}/>
                <div style={props.active ? barActiveStyles.bar3 : undefined} className={classes.bar}/>
            </div>
        </IconButton>
    )
}