import React from "react"
import { useTheme } from "@material-ui/core/styles"

export default function SidebarMenuHeader(props) {
    const theme = useTheme()
    const style = {
        backgroundColor: theme.palette.secondary["A200"]
    }
    return (
        <div style={style} className="SidebarMenuHeader gridCenter">
        </div>
    )
}