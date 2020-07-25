import React, { useState, useEffect } from "react"
import { Card, Slider, Typography } from "@material-ui/core"
import { useSelector, useDispatch } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import { setSilos } from "../../../actions/farmValueActions"
import HeadedCard from "../../HeadedCard"

const useStyle = makeStyles(theme => ({
	root: {
		padding: "10px 30px",
	},
	siloImage: {
		gridArea: "silo",
		filter: "drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.2))",
		height: 100,
	}
}))

export default function SiloSlider(props) {
	const classes = useStyle()
    const dispatch = useDispatch()
    const initialValue = useSelector(store => store.farmValue.farm.silosOwned)
    let [siloCount, setSiloCount] = useState(initialValue)
    useEffect(() => setSiloCount(initialValue), [initialValue])

	let siloImages = []
	for (let i=0; i < siloCount; i++) {
		let scale = 1 - (0.04 * Math.ceil(i / 2))
		let translation = 40 * Math.ceil(i / 2) * Math.pow(-1, i) * scale
		siloImages.push(
			<img 
				key={i}
				src="/images/silo.png" 
				className={classes.siloImage}
				style={{transform: `translateX(${translation}%) scale(${scale})`, zIndex: 100 - i}}/>
		)
	}

	var marks = []
	for (let i = 1; i <= 10; i++) {
		marks.push({
			value: i,
			label: i == 1 || i == 10 ? i : null,
		})
	}

    return (
        <HeadedCard cardID="silo_slider" collapsable title="Silos" className={classes.root}>
			<Typography variant="h4" align="center">{siloCount}</Typography>
			<div style={{display: "grid", gridTemplateAreas: "silo"}}>
				{siloImages}
			</div>
            <Slider
                value={siloCount}
                onChange={(evt, newValue) => setSiloCount(newValue)}
                onChangeCommitted={() => dispatch(setSilos(siloCount))}
                min={1}
                max={10}
                marks={marks}
                color="secondary"
            />
        </HeadedCard>
    )
}