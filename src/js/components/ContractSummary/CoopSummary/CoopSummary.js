import React from "react"
import { useSelector } from "react-redux"
import { Route, useRouteMatch, Redirect, useParams } from "react-router-dom"
import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import CoopRewards from "./CoopRewards"
import Loading from "../../Loading"
import CoopExpiry from "./CoopExpiry"
import CoopEstimate from "./CoopEstimate"
import CoopMembers from "./CoopMembers"
import CoopExpiryEstimate from "./CoopExpiryEstimate"
import HelpTooltip from "../../Decorator/HelpTooltip"

const useStyle = makeStyles(theme => ({
	root: {
		display: "flex",
		flexDirection: "column",

		"&>*": {
			margin: "10px 0px",
		}
	},
	type: {
		margin: 0,
	}
}))

export default function CoopSummary(props) {
	const contract = props.contract
	const classes = useStyle()
    const currentRoute = useRouteMatch()
    const coop = useSelector(state => state.contract.coops[props.contract.name])

    if (coop && coop.fetched) {
		const coopRewardSet = contract.goals[coop.league] || contract.goals
        return (
            <div style={props.style} className={classes.root}>
                <Redirect to={`${currentRoute.url}/${coop.coop}`} />
                <Route path={`${currentRoute.path}/:coopId`}>
					<Typography className={classes.type} align="center" variant="h4">{coop.coop}</Typography>
					<Typography className={classes.type} align="center" variant="h6">{coop.league.toUpperCase()}</Typography>
					<CoopRewards eggsLaid={coop.eggs} rewards={coopRewardSet}/>
						<Typography variant="h5" align="center">
							Completion Pace <HelpTooltip 
												helpText={"The completion pace shows the ratio between your estimated completion time and the remaining time. Aim to keep this under the red \"success threshold\" line."}
											/>
						</Typography>
                    <CoopExpiryEstimate contract={contract} rewards={coopRewardSet} coop={coop}/>
                    <Typography align="center" variant="h5">Members ({coop.members.length}/{contract.coopSize})</Typography>
                    <CoopMembers coop={coop} />
                </Route>
            </div>
        )
    }
    else {
		return null
    }
}