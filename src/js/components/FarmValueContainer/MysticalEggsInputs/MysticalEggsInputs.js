import React, { useState, useEffect } from "react"
import { Card } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import MEInput from "./MEInput"
import HeadedCard from "../../HeadedCard"
import { useSelector } from "react-redux"

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
	const soulEggs = useSelector(store => store.farmValue.game.soulEggsD)
	const eggsOfProphecy = useSelector(store => store.farmValue.game.eggsOfProphecy)

    return (
        <HeadedCard style={props.style} collapsable title="Mystical Eggs" className={classes.root}>
            <MEInput type="SOUL_EGGS" value={soulEggs}/>
            <MEInput type="PROPHECY_EGGS" value={eggsOfProphecy}/>
        </HeadedCard>
    )
}