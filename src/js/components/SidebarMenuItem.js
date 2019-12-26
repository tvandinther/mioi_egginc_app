import React from "react"
import { NavLink } from "react-router-dom"

export default function SidebarMenuItem(props) {
    let classNames = ["SidebarMenuItem", "gridCenter"]
    return (
        <NavLink onClick={props.onClick} to={props.href} exact activeClassName="active">
            <div className={classNames.join(" ")}>
                <span>{props.text}</span>
            </div>
        </NavLink>
    )
}