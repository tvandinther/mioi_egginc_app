import React from "react"
import { useTheme, makeStyles } from "@material-ui/core/styles"
import { Typography, AppBar, Toolbar, Slide, useScrollTrigger } from "@material-ui/core"
import MenuButton from "./MenuButton"
import { useSelector } from "react-redux"

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        zIndex: theme.zIndex.drawer + 1,
    },
    title: {
        flexGrow: 1,
    },
}))

function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({ target: window ? window() : undefined });
  
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
}

export default function Navbar(props) {
    const theme = useTheme()
    const UI = useSelector(state => state.UI)
    const classes = useStyles()
    console.log("THEME: ", theme)
    return (
        <HideOnScroll {...props}>
            <AppBar className={classes.root} position="fixed">
                <Toolbar style={{flexDirection: UI.menuOnLeft? "row" : "row-reverse"}}>
                    <MenuButton active={UI.isSidebarVisible} left={UI.menuOnLeft}/>
                    <Typography variant="h6" align="center" className={classes.title}>
                        {props.title}
                    </Typography>
                    <div style={{width: "50px"}}/>
                </Toolbar>
            </AppBar>
        </HideOnScroll>
    )
}