import React from "react"
import { Typography } from "@material-ui/core"
import { useTheme } from "@material-ui/core/styles"

export default function ContractCardHeader(props) {
    const theme = useTheme()
    const style = {
        backgroundColor: theme.palette.primary.main,
    }

    return (
        <div style={style} className="ContractCardHeader">
            <Typography variant="h2">{props.text}</Typography>
        </div>
    )
}