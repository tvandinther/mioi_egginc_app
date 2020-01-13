import React from "react"
import { useTheme } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"

export default function Navbar(props) {
    const theme = useTheme()
    const style = {
        backgroundColor: theme.palette.primary["700"]
    }
    console.log(theme)
    return (
        <div style={style} className="Navbar gridCenter">
            <Typography color="textPrimary" align="center" variant="h4">{props.title}</Typography>
        </div>
    )
}