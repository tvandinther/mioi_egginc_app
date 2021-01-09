import React from "react"
import { useTheme } from "@material-ui/core/styles"
import { useSelector, useDispatch } from "react-redux"
import { hideSidebar } from "../../actions/UIActions"
import useStyle from "./styles"
import * as UIActions from "../../actions/UIActions"
import SettingsSwitch from "../appSettings/SettingsSwitch"
import PlayerIDSelect from "../appSettings/PlayerIDSelect"
import switchProfiles from "../appSettings/switchProfiles"
import SidebarMenuHeader from "./SidebarMenuHeader"
import SidebarMenuItem from "./SidebarMenuItem"
import {
    SwipeableDrawer,
    List,
    Drawer,
    Divider,
    Typography,
    SvgIconTypeMap,
} from "@material-ui/core"
import sidebarMap, { SidebarItemSet } from "./sidebarMap"

// ICONS
import HomeIcon from '@material-ui/icons/Home';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import HelpIcon from '@material-ui/icons/Help';
import NotesIcon from '@material-ui/icons/Notes';
import SettingsIcon from '@material-ui/icons/Settings';
import LinkIcon from '@material-ui/icons/Link';
import {OverridableComponent} from "@material-ui/core/OverridableComponent";

export default function SidebarMenu() {
    const UI = useSelector(state => state.UI)
    const dispatch = useDispatch()
    const classes = useStyle()
    const theme = useTheme()

	const dispatchHideSidebar = () => dispatch(hideSidebar())

	const createComponents = (objectMap: SidebarItemSet) => Object.entries(objectMap).map(([text, { path, icon, disabled, external }]) => {
        return <SidebarMenuItem disabled={disabled} external={external} text={text} path={path} key={path} onClick={dispatchHideSidebar} icon={icon}/>
	})

    const sidebarMenuItemComponents = createComponents(sidebarMap[0])
	const sidebarMenuItemComponents2 = createComponents(sidebarMap[1])

    let DynamicDrawer = (props: React.PropsWithChildren<any>) => {
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
					<PlayerIDSelect/>
					<SettingsSwitch {...switchProfiles.darkTheme}/>
					<Divider/>
					<Typography className={classes.text} variant="overline">© Created by Tom</Typography>
					<Typography className={classes.text} variant="caption">Version {VERSION}</Typography>
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