import React, { useState } from "react"
import research from "../../../tools/research.json"
import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import HeadedCard from "../../HeadedCard"
import ResearchExpansionPanel from "./ResearchExpansionPanel"

const useStyle = makeStyles(theme => ({
    header: {
        padding: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
	},
}))

export default function ResearchTierPanels(props) {
	const classes = useStyle()
	let researchTiers = Array.from(research.common)
	researchTiers.push(research.epic)
	let [expanded, setExpanded] = useState(false)
	let [maxed, setMaxed] = useState(0)
	let [maxedEpic, setMaxedEpic] = useState(false)

	const handleSetMax = tier => {
		if (tier !== "epic") setMaxed(tier)
		else setMaxedEpic(true)
	}

	const expansionPanels = researchTiers.map((tier, index) => 
		<ResearchExpansionPanel
			key={index}
			index={index}
			tier={tier}
			expanded={expanded}
			setExpanded={setExpanded}
			maxed={tier.tier === "epic" ? maxedEpic : maxed}
			setMaxed={tier.tier === "epic" ? setMaxedEpic : setMaxed}
		/>
	)

    return (
        <div>
            <HeadedCard cardID="research_tiers" title="Research" className={classes.header}>
                <Typography variant="subtitle1">Select a tier to change research</Typography>
            </HeadedCard>
            {expansionPanels}
        </div>
    )
}