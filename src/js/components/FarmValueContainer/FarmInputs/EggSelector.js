import React from "react"
import eggs from "../../../tools/eggTypes.json"
import { makeStyles } from "@material-ui/core/styles"
import { setEgg } from "../../../actions/farmValueActions"
import { useSelector } from "react-redux"
import HeadedCard from "../../HeadedCard"
import ImageDropdown from "../../ImageDropdown"

const useStyle = makeStyles(theme => ({
    root: {
        margin: "auto",
        maxWidth: 400,
		padding: 10,
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-evenly",
    },
}))

export default function EggSelector(props) {
    const classes = useStyle()
    const initialValue = useSelector(store => store.farmValue.farm.eggType)

	let mainEggs = {
		items: []
	}
	let contractEggs = {
		title: "Contract Eggs",
		items: []
	}
	for (let [key, value] of Object.entries(eggs)) {
		let section
		if (value.unlock === null) section = contractEggs
		else section = mainEggs
		section.items.push({
			title: value.name,
			imageSrc: `/images/egg${key}.png`,
			value: key,
		})
	}

    return (
        <HeadedCard cardID="egg_select" collapsable title="Farm Egg" className={classes.root}>
			<ImageDropdown
				type="large"
				initialValue={initialValue || 1}
				menuMap={[mainEggs, contractEggs]}
				dispatchFunc={setEgg}
			/>
        </HeadedCard>
    )
}