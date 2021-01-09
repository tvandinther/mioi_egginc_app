import React from "react"
import { Typography } from "@material-ui/core"
import useStyle from "./styles"

export default function ContractCardHeader({ text }: { text: string }) {
    const classes = useStyle()

    return (
        <div className={classes.header}>
            <Typography className={classes.title} variant="h2">{text}</Typography>
        </div>
    )
}