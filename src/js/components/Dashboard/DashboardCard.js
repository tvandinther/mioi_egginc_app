import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import { Card } from "@material-ui/core"

const useStyle = makeStyles(theme => ({
    card: {
        padding: 10,
        minHeight: 150,
    },
}))

export default function DashboardCard(props) {
    const classes = useStyle()

    let [raised, setRaised] = useState(false)
    const toggleRaised = () => {
        setRaised(!raised)
    }

    return (
        <Card raised={raised} onMouseOver={toggleRaised} onMouseOut={toggleRaised} className={`${classes.card} ${props.className}`}>
            {props.children}
        </Card>
    )
}