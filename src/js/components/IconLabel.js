import React from "react"
import { SvgIcon, Typography } from "@material-ui/core"
import { useTheme } from "@material-ui/core/styles"

export default function IconLabel(props) {
    const theme = useTheme()
    const style = {
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        flex: "1 1 0px",
    }
    const iconStyle = {
        width: "36px",
        height: "36px",
    }

    return (
        <div style={style}>
            <SvgIcon style={iconStyle} fontSize="large" color="secondary" component={props.icon}/>
            <Typography>{props.label}</Typography>
        </div>
    )
}