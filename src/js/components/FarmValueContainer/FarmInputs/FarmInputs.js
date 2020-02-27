import React from "react"
import { Card } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import ResearchTierPanels from "./ResearchTierPanels"
import EggSelector from "./EggSelector"
import SiloSlider from "./SiloSlider"
import PopulationInput from "./PopulationInput"

const useStyle = makeStyles(theme => ({
    root: {
        flexGrow: 3,
        width: "100%",
        marginLeft: "0 !important",
        marginRight: "0 !important",
        marginTop: -20,

        "& >*": {
            margin: "20px 0px",
        }
    },
}))

export default function FarmInputs(props) {
    const classes = useStyle()
    const { farm, game, stats } = props

    return (
        <div style={props.style} className={classes.root}>
            <EggSelector/>
            <SiloSlider/>
            <PopulationInput stats={stats}/>
            <ResearchTierPanels/>
        </div>
    )
}