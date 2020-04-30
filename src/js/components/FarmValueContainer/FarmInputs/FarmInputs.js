import React from "react"
import { Card } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import ResearchTierPanels from "./ResearchTierPanels"
import EggSelector from "./EggSelector"
import HabSelector from "./HabSelector"
import SiloSlider from "./SiloSlider"
import PopulationInput from "./PopulationInput"
import ShippingInput from "./ShippingInput"

const useStyle = makeStyles(theme => ({
    root: {
		// display: "flex",
        flexGrow: 3,
        width: "100%",
        marginLeft: "0 !important",
        marginRight: "0 !important",
		marginTop: -20,

        "& >*": {
			margin: "20px 0px",
			flexGrow: "1",
			// height: "max-content",
        }
    },
}))

export default function FarmInputs(props) {
    const classes = useStyle()

    return (
        <div style={props.style} className={classes.root}>
            <EggSelector/>
			<HabSelector/>
			<ShippingInput/>
            <PopulationInput />
			<SiloSlider/>
            <ResearchTierPanels/>
        </div>
    )
}