import React from "react"
import { SvgIcon, Typography } from "@material-ui/core"
import { useTheme } from "@material-ui/core/styles"

export default function IconLabel(props) {
    const theme = useTheme()
    const style = {
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        flex: "1 1 0px",
        alignItems: "center",
        gap: 10,
        justifyContent: "space-between",
    }
    const iconStyle = {
        width: "36px",
        height: "36px",
    }

    return (
        <div style={style}>
            <SvgIcon style={iconStyle} fontSize="large" color="secondary" component={props.icon}/>
            <Typography variant="subtitle1">{props.label}</Typography>
        </div>
    )
}