import React from "react"
import { useSelector } from "react-redux"
import { Route, useRouteMatch, Redirect } from "react-router-dom"
import { Typography } from "@material-ui/core"

import CoopExpiry from "./CoopExpiry"
import CoopEstimate from "./CoopEstimate"
import CoopMembers from "./CoopMembers"

export default function CoopSummary(props) {
    const contract = props.contract
    const currentRoute = useRouteMatch()
    const coop = useSelector(state => state.contract.coops[props.contract.name])
    const style = {
        ...props.style,
        display: "grid",
        gridTemplateAreas: `
            "expiry"
            "estimate"
            "members-heading"
            "members-table"
        `,
        gap: 10,
        
    }
    if (coop && coop.fetched && !coop.error) {
        return (
            <div style={style}>
                <Redirect to={`${currentRoute.url}/${coop.coop}`} />
                <Route path={`${currentRoute.path}/:coopId`}>
                    <CoopExpiry coop={coop} />
                    <CoopEstimate contract={contract} coop={coop} />
                    <Typography variant="h5">Members</Typography>
                    <CoopMembers coop={coop} />
                </Route>
            </div>
        )
    }
    else {
        return null
    }
}