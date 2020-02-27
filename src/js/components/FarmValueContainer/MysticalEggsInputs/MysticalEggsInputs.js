import React, { useState, useEffect } from "react"
import { Card } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import MEInput from "./MEInput"
import HeadedCard from "../../HeadedCard"

const useStyle = makeStyles(theme => ({
    root: {
        padding: 10,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridGap: 20,
    }
}))

export default function MysticalEggsInputs(props) {
    const classes = useStyle()

    return (
        <HeadedCard style={props.style} title="Mystical Eggs" className={classes.root}>
            <MEInput type="SOUL_EGGS"/>
            <MEInput type="PROPHECY_EGGS"/>
        </HeadedCard>
    )
}