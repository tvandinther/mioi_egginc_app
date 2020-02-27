import React, { useState } from "react"
import research from "../../../tools/research.json"
import { Paper, Typography, Divider, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from "@material-ui/core"
import ResearchInput from "./ResearchInput"
import { makeStyles } from "@material-ui/core/styles"
import HeadedCard from "../../HeadedCard"

const useStyle = makeStyles(theme => ({
    panelDetails: {
        display: "grid",
        gridTemplateColumns: "1fr",
        gridAutoRows: "auto",
        gridGap: 5,
    },
    header: {
        padding: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    }
}))

export default function ResearchTierPanels(props) {
    const classes = useStyle()
    let [expanded, setExpanded] = useState(false)
    const expansionPanels = research.common.map((tier, index) => {
        const researchInputs = tier.research.map((research, index) => (
            <ResearchInput key={index} research={research} />
        ))
        return (
            <ExpansionPanel key={index} expanded={expanded === index} onChange={(evt, isExpanded) => setExpanded(isExpanded? index : false)}>
                <ExpansionPanelSummary>
                    <Typography variant="subtitle1">{tier.title}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.panelDetails}>
                    {researchInputs}
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    })

    return (
        <div>
            <HeadedCard title="Research" className={classes.header}>
                <Typography variant="subtitle1">Select a tier to change research</Typography>
            </HeadedCard>
            {expansionPanels}
        </div>
    )
}