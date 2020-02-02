import React from "react"
import { NavLink } from "react-router-dom"
import { useTheme } from "@material-ui/core/styles"
import { ListItem, ListItemText, ListItemIcon, SvgIcon } from "@material-ui/core"

export default function SidebarMenuItem(props) {
    const theme = useTheme()

    const activeStyle = {
        backgroundColor: theme.palette.secondary["A100"]
    }
    return (
        <NavLink onClick={props.onClick} to={props.href} exact={props.href === "/"} activeStyle={activeStyle}>
            <ListItem button>
                <ListItemIcon>
                    <SvgIcon component={props.icon}/>
                </ListItemIcon>
                <ListItemText primary={props.text} primaryTypographyProps={{variant: "h5"}}/>
            </ListItem>
        </NavLink>
    )
}