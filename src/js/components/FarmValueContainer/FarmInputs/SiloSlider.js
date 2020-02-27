import React, { useState, useEffect } from "react"
import { Card, Slider } from "@material-ui/core"
import { useSelector, useDispatch } from "react-redux"
import { setSilos } from "../../../actions/farmValueActions"
import HeadedCard from "../../HeadedCard"

export default function SiloSlider(props) {
    const dispatch = useDispatch()
    const initialValue = useSelector(store => store.farmValue.farm.silosOwned)
    let [siloCount, setSiloCount] = useState(initialValue)
    useEffect(() => setSiloCount(initialValue), [initialValue])

    return (
        <HeadedCard title="Silos">
            <Slider
                value={siloCount}
                onChange={(evt, newValue) => setSiloCount(newValue)}
                onChangeCommitted={() => dispatch(setSilos(siloCount))}
                min={1}
                max={10}
                marks
                color="secondary"
            />
        </HeadedCard>
    )
}