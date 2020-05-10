import React from "react"
import habs from "../../../tools/habs.json"
import { makeStyles } from "@material-ui/core/styles"
import { setHab } from "../../../actions/farmValueActions"
import { useSelector } from "react-redux"
import HeadedCard from "../../HeadedCard"
import ImageDropdown from "../../ImageDropdown"

const useStyle = makeStyles(theme => ({
    root: {
        margin: "auto",
        maxWidth: 800,
		padding: 10,
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-evenly",

		"& > *": {
			marginLeft: 10,
			marginRight: 10,
			width: 108,
		}
    },
}))

export default function EggSelector(props) {
    const classes = useStyle()
    const initialValues = useSelector(store => store.farmValue.farm.habsList)

	let habMap = {
		items: []
	}
	habs.forEach(({ name }, index) => {
		
		habMap.items.push({
			title: name,
			imageSrc: `/images/hab${index}.png`,
			value: index,
		})
	})
	habMap.items.unshift(habMap.items.pop()) // bring the No hab option to the top

	var dropdowns = []
	for (let i = 0; i < 4; i++) {
		dropdowns.push(
			<ImageDropdown
				key={i}
				initialValue={initialValues[i] || 0}
				menuMap={[habMap]}
				dispatchFunc={(value) => {return setHab(value, i)}}
			/>
		)
	}

    return (
        <HeadedCard title="Habs" collapsable className={classes.root}>
			{dropdowns}
        </HeadedCard>
    )
}