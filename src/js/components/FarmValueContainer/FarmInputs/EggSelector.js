import React, { useState, useEffect } from "react"
import { Card, Select, MenuItem, Typography } from "@material-ui/core"
import eggs from "../../../tools/eggTypes.json"
import { makeStyles } from "@material-ui/core/styles"
import { setEgg } from "../../../actions/farmValueActions"
import { useDispatch, useSelector } from "react-redux"
import HeadedCard from "../../HeadedCard"

const useStyle = makeStyles(theme => ({
    root: {
        margin: "auto",
        maxWidth: 400,
        padding: 10,
        display: "grid",
        gridTemplateColumns: "1fr 80px",
        gridTemplateRows: "max-content",
        gridGap: 10,
    },
    selector: {
        width: "100%",
        overflow: "hidden",
    },
    selectorItem: {
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gridGap: 5,
        alignItems: "center",
    },
    image: {
        height: 36,
        width: "auto",
    },
}))

export default function EggSelector(props) {
    const classes = useStyle()
    const dispatch = useDispatch()
    const initialValue = useSelector(store => store.farmValue.farm.eggType)
    let [selected, setSelected] = useState(initialValue)
    useEffect(() => setSelected(initialValue), [initialValue])

    const options = eggs.map((egg, index) => {
        let eggIndex = index + 1
        return (
            <MenuItem key={egg.name} value={eggIndex} className={classes.selectorItem}>
                <img src={`/images/egg${eggIndex}.png`} className={classes.image}/>
                <Typography>{egg.name}</Typography>
            </MenuItem>
        )
    })

    const handleChange = evt => {
        let value = evt.target.value
        setSelected(value)
        dispatch(setEgg(value))
    }

    return (
        <HeadedCard title="Farm Egg" className={classes.root}>
            <Select value={selected} onChange={handleChange} className={classes.selector} classes={{select: classes.selectorItem}}>
                {options}
            </Select>
        </HeadedCard>
    )
}