import React, { useEffect } from "react"
import { Container } from "@material-ui/core"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import FarmStats from "./FarmStats"
import FarmSelector from "./FarmSelector"
import MysticalEggsInputs from "./MysticalEggsInputs"
import FarmInputs from "./FarmInputs/FarmInputs"

const useStyle = makeStyles(theme => ({
    root: {
        display: "grid",
        padding: 20,
        gridGap: 20,
        gridTemplateRows: "auto",
		gridTemplateColumns: "2fr 1fr",
		alignItems: "start",
        gridTemplateAreas: `
            "stats load-farm"
            "stats mystical-eggs"
            "farm-inputs farm-inputs"
        `,
        [`@media (max-width: ${theme.breakpoints.values.md}px)`]: {
            gridTemplateAreas: `
                "stats stats"
                "load-farm load-farm"
                "mystical-eggs mystical-eggs"
                "farm-inputs farm-inputs"
            `,
        }
    },
}))

export default function FarmValueContainer(props) {
    const classes = useStyle()
    const theme = useTheme()

    return (
        <Container className={classes.root}>
            <FarmStats style={{gridArea: "stats"}} />
            <FarmSelector style={{gridArea: "load-farm"}} />
            <MysticalEggsInputs style={{gridArea: "mystical-eggs"}} />
            <FarmInputs style={{gridArea: "farm-inputs"}} />
        </Container>
    )
}