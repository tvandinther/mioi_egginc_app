import React from "react"
import { useSelector } from "react-redux"
import { Route, useRouteMatch, Redirect, useParams } from "react-router-dom"
import { Typography } from "@material-ui/core"
import CoopRewards from "./CoopRewards"
import CoopExpiry from "./CoopExpiry"
import CoopEstimate from "./CoopEstimate"
import CoopMembers from "./CoopMembers"
import CoopExpiryEstimate from "./CoopExpiryEstimate"

export default function CoopSummary(props) {
    const contract = props.contract
    const currentRoute = useRouteMatch()
    const coop = useSelector(state => state.contract.coops[props.contract.name])
    const style = {
        ...props.style,
        display: "grid",
        gridTemplateAreas: `
			"coop-title"
			"rewards"
			"expiry"
            "estimate"
            "members-heading"
            "members-table"
        `,
        gap: 10,
        
    }

    if (coop && coop.fetched) {
		const coopRewardSet = contract.goals[coop.league] || contract.goals
        return (
            <div style={style}>
                <Redirect to={`${currentRoute.url}/${coop.coop}`} />
                <Route path={`${currentRoute.path}/:coopId`}>
					<Typography style={{gridArea: "coop-title"}} align="center" variant="h4">{coop.coop}</Typography>
					<CoopRewards style={{gridArea: "rewards"}} eggsLaid={coop.eggs} rewards={coopRewardSet}/>
                    <CoopExpiryEstimate contract={contract} rewards={coopRewardSet} coop={coop}/>
                    <Typography variant="h5">Members ({coop.members.length}/{contract.coopSize})</Typography>
                    <CoopMembers coop={coop} />
                </Route>
            </div>
        )
    }
    else {
        return null // Can insert a loader
    }
}