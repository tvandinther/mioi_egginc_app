import React, { useContext, useReducer } from "react"
import { useTheme } from "@material-ui/core/styles"

export default function MenuButton(props) {
    const theme = useTheme()
    const style = {
        
    }
    const barStyle = {
        backgroundColor: theme.palette.primary.contrastText,
    }
    const classNames = ["MenuButton"]
    if (props.isSidebarVisible) {
        classNames.push("change")
    }
    if (props.menuOnLeft) {
        classNames.push("left")
    }
    return (
        <div onClick={props.onClick} className={classNames.join(" ")}>
            <div>
                <div style={barStyle} className="bar1"></div>
                <div style={barStyle} className="bar2"></div>
                <div style={barStyle} className="bar3"></div>
            </div>
        </div>
    )
}