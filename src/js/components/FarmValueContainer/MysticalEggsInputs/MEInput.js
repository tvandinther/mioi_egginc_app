import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Input } from "@material-ui/core"

const useStyle = makeStyles(theme => ({
    root: {
        display: "grid",
        gridTemplateColumns: "1fr",
        alignItems: "center",
        justifyItems: "center",

        "& >img": {
            width: 100,
            height: "auto",
        }
    }
}))

export default function MEInput(props) {
    const { type } = props
    const classes = useStyle()

    return (
        <div className={classes.root}>
            <img src={`/images/${type}.png`}/>
            <Input
                min={0}
                type="number"
            />
        </div>
    )
}