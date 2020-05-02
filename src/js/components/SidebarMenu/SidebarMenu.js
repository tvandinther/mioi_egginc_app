import React, { useEffect, useRef } from "react"
import { useTheme, makeStyles } from "@material-ui/core/styles"
import { useSelector, useDispatch } from "react-redux"
import { hideSidebar } from "../../actions/UIActions"

// ACTIONS
import * as UIActions from "../../actions/UIActions"

import MenuButton from "../MenuButton"
import SidebarMenuHeader from "./SidebarMenuHeader"
import SidebarMenuItem from "./SidebarMenuItem"
import { SwipeableDrawer, List, Drawer, Divider, Typography } from "@material-ui/core"
// ICONS
// import { HomeIcon, ReceiptIcon, HelpIcon, SettingsIcon } from "@material-ui/icons"
import HomeIcon from '@material-ui/icons/Home';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import HelpIcon from '@material-ui/icons/Help';
import NotesIcon from '@material-ui/icons/Notes';
import SettingsIcon from '@material-ui/icons/Settings';
import LinkIcon from '@material-ui/icons/Link';

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
	text: {
		margin: "0px 5px",
		textAlign: "right",
	}
}))

export default function SidebarMenu(props) {
    const UI = useSelector(state => state.UI)
    const dispatch = useDispatch()
    const classes = useStyle()
    const theme = useTheme()

    const menuItems = {
        "Dashboard" : {
            path: "/",
			icon: HomeIcon,
			disabled: false,
        },
        "Contracts" : {
            path: "/contract",
			icon: ReceiptIcon,
			disabled: false,
        },
        "Farm Value" : {
            path: "/farmvalue",
			icon: AttachMoneyIcon,
			disabled: false,
        },
        "Game Guide" : {
            path: "/guide",
			icon: HelpIcon,
			disabled: true,
        },
	}
	const menuItems2 = {
		"App Settings" : {
            path: "/settings",
			icon: SettingsIcon,
			disabled: false,
		},
		"News" : {
			path: "/news",
			icon: NotesIcon,
		},
		"Get Egg, Inc." : {
			path: "http://www.auxbrain.com/",
			icon: LinkIcon,
			external: true,
		}
	}

	const dispatchHideSidebar = () => dispatch(hideSidebar())

	const createComponents = objectMap => Object.entries(objectMap).map(([text, { path, icon, disabled, external }]) => {
        return <SidebarMenuItem disabled={disabled} external={external} text={text} href={path} key={path} onClick={dispatchHideSidebar} icon={icon}/>
	})

    const sidebarMenuItemComponents = createComponents(menuItems)
	const sidebarMenuItemComponents2 = createComponents(menuItems2)
    let DynamicDrawer = (props) => {
        if (true || window.innerWidth < theme.breakpoints.values.md) {
            return (
                <SwipeableDrawer 
                    hysteresis={0.27} 
                    minFlingVelocity={300} 
                    anchor={UI.menuOnLeft ? "left" : "right"} 
                    className={classes.drawer}
                    classes={{paper: classes.drawerPaper}}
                    open={UI.isSidebarVisible}
                    onOpen={() => dispatch(UIActions.showSidebar())} 
                    onClose={() => dispatch(UIActions.hideSidebar())}
                >
                    {props.children}
					<Divider/>
					<Typography className={classes.text} variant="overline">© Created by Tom</Typography>
					<Typography className={classes.text} variant="caption">Version {0.15}</Typography>
                </SwipeableDrawer>
            )
        }
        else {
            return (
                <Drawer
                    variant="permanent"
                    anchor={UI.menuOnLeft ? "left" : "right"} 
                    className={classes.drawer}
                    classes={{paper: classes.drawerPaper}}
                >
                    {props.children}
                </Drawer>
            )
        }
    }
    
    return (
        <DynamicDrawer>
            <div>
                <SidebarMenuHeader left={UI.menuOnLeft}/>
                <List>
                    {sidebarMenuItemComponents}
					<Divider/>
					{sidebarMenuItemComponents2}
                </List>
            </div>
        </DynamicDrawer>
    )
}