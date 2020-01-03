import React from "react"
import { NavLink } from "react-router-dom"
import { useTheme } from "@material-ui/core/styles"

export default function SidebarMenuItem(props) {
    const theme = useTheme()
    const style = {
        backgroundColor: "inherit"
    }
    const activeStyle = {
        backgroundColor: theme.palette.secondary["A100"]
    }
    let classNames = ["SidebarMenuItem", "gridCenter"]
    return (
        <NavLink onClick={props.onClick} to={props.href} exact={props.href === "/"} activeStyle={activeStyle}>
            <div style={style} className={classNames.join(" ")}>
                <span>{props.text}</span>
            </div>
        </NavLink>
    )
}