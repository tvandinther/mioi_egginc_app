import React, { useState, useEffect } from "react"
import { Input, Slider, Card, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useDispatch, useSelector } from "react-redux"
import { setPopulation } from "../../../actions/farmValueActions"
import HeadedCard from "../../HeadedCard"

const useStyle = makeStyles(theme => ({
    root: {
        display: "grid",
        gridGap: 10,
        alignItems: "center",
        justifyItems: "center",
        gridTemplateColumns: "120px 1fr 120px",
    },
    input: {
        width: 300,
        gridColumn: "2",
    }
}))

export default function PopulationInput(props) {
    const { stats } = props
    const classes = useStyle()
    const dispatch = useDispatch()
    const initialValue = useSelector(store => store.farmValue.farm.numChickens)

    let [value, setValue] = useState(initialValue)
    useEffect(() => setValue(initialValue), [initialValue])

    const handleInputChange = evt => {
        setValue(event.target.value === "" ? "" : Number(event.target.value))
    }

    const handleBlur = evt => {
        let currentValue
        if (value < 0 || value == "") {
            currentValue = 0
        }
        else if (value > stats.maxHabCapacity) {
            currentValue = stats.maxHabCapacity
        }
        setValue(currentValue)
        submitChange(currentValue)
    }

    const submitChange = (currentValue) => {
        dispatch(setPopulation(currentValue))
    }

    return (
        <HeadedCard title="Chicken Population" className={classes.root}>
            <Typography>0</Typography>
            <Slider
                value={typeof value === "number" ? value : 0}
                onChange={(evt, newValue) => setValue(newValue)}
                onChangeCommitted={(evt, newValue) => submitChange(newValue)}
                min={0}
                max={stats.maxHabCapacity}
                color="secondary"
            />
            <Typography>{stats.maxHabCapacity.toLocaleString()}</Typography>
            <Input
                className={classes.input}
                value={value}
                onChange={handleInputChange}
                onBlur={handleBlur}
                type="number"
            />
        </HeadedCard>
    )
}