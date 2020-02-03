import React, { useEffect, useRef } from "react"
import { useTheme, makeStyles } from "@material-ui/core/styles"
import { connect, useSelector, useDispatch } from "react-redux"

// ACTIONS
import * as UIActions from "../../actions/UIActions"
import { useClickAway } from "../../customHooks/customHooks"

import MenuButton from "../MenuButton"
import SidebarMenuHeader from "./SidebarMenuHeader"
import SidebarMenuItem from "./SidebarMenuItem"
import { SwipeableDrawer, List } from "@material-ui/core"
// ICONS
// import { HomeIcon, ReceiptIcon, HelpIcon, SettingsIcon } from "@material-ui/icons"
import HomeIcon from '@material-ui/icons/Home';
import ReceiptIcon from '@material-ui/icons/Receipt';
import HelpIcon from '@material-ui/icons/Help';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyle = makeStyles(theme => ({
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
}))

function SidebarMenu(props) {
    const UI = useSelector(state => state.UI)
    const dispatch = useDispatch()
    const classes = useStyle()

    const menuItems = {
        "My Farm" : {
            path: "/",
            icon: HomeIcon,
        },
        "Contracts" : {
            path: "/contract",
            icon: ReceiptIcon,
        },
        "Game Guide" : {
            path: "/guide",
            icon: HelpIcon,
        },
        "App Settings" : {
            path: "/settings",
            icon: SettingsIcon,
        }
    }
    const sidebarMenuItemComponents = Object.entries(menuItems).map(([text, { path, icon }]) => {
        return <SidebarMenuItem text={text} href={path} key={path} onClick={props.hideSidebar} icon={icon}/>
    })

    return (
        <SwipeableDrawer 
            hysteresis={0.42} 
            minFlingVelocity={300} 
            anchor={UI.menuOnLeft ? "left" : "right"} 
            className={classes.drawer}
            classes={{paper: classes.drawerPaper}}
            open={UI.isSidebarVisible} 
            onOpen={() => dispatch(UIActions.showSidebar())} 
            onClose={() => dispatch(UIActions.hideSidebar())}
        >
            <div>
                <SidebarMenuHeader left={UI.menuOnLeft}/>
                <List>
                    {sidebarMenuItemComponents}
                </List>
            </div>
        </SwipeableDrawer>
    )
}

const mapStateToProps = store => {
    const {UI: {sizeFormat, isSidebarVisible, menuOnLeft} } = store;
	return {
        sizeFormat,
        isSidebarVisible,
        menuOnLeft,
	}
}

const mapDispatchToProps = {
	...UIActions
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarMenu)