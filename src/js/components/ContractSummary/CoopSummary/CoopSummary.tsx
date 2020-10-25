import React, { useState, useEffect, CSSProperties } from "react"
import { useSelector } from "react-redux"
import { Route, useRouteMatch, Redirect } from "react-router-dom"
import { Typography } from "@material-ui/core"
import path from "path"
import CoopRewards from "./CoopRewards"
import ShareCoop from "./ShareCoop"
import CoopMembers from "./CoopMembers"
import CoopExpiryEstimate from "./CoopExpiryEstimate"
import HelpTooltip from "../../Decorator/HelpTooltip"
import LabelToggle from "../../controls/LabelToggle"
import ReactGA from "react-ga"
import CoopSettings from "./CoopSettings"
import { Contract, ContractGoals } from "../../../../types/contract"
import useStyle from "./styles"
import { isContractGoals } from "../../../../types/typeGuards"

export default function CoopSummary({ style, contract }: { style: CSSProperties, contract: Contract }) {
	const classes = useStyle()
    const currentRoute = useRouteMatch()
	const coop = useSelector(store => store.contract.coops[contract.name])
	const [selectedLeague, setSelectedLeague] = useState("standard")

	const handleLeagueChange = (state: boolean) => {
		if (state === false) setSelectedLeague("standard")
		else setSelectedLeague("elite")
	}

	const logTierChange = (evt: React.ChangeEvent, newState: boolean) => {
		ReactGA.event({
			category: "Contract",
			action: "Co-op Tier Changed",
			label: newState ? "Elite" : "Standard",
		})
	}

	useEffect(() => {
		if (coop.fetched && coop.league) setSelectedLeague(coop.league)
	}, [(coop && coop.league)])

	const coopRewardSet = isContractGoals(contract.goals) ? (contract.goals[selectedLeague as keyof ContractGoals]) : contract.rewards

    if (coop && coop.fetched) {
		console.log(coop)
        return (
            <div style={style} className={classes.root}>
                <Redirect to={path.join(currentRoute.url, coop.coop)} />
                <Route path={path.join(currentRoute.path, ":coopId")}>
					<Typography className={classes.type} align="center" variant="h4">{coop.coop}<ShareCoop coop={coop}/><CoopSettings/></Typography>
					<LabelToggle state={selectedLeague === "elite"} labels={["Standard", "Elite"]} onChange={handleLeagueChange} onClick={logTierChange}/>
					<CoopRewards eggsLaid={coop.eggs} rewards={coopRewardSet}/>
					<Typography variant="h5" align="center">
						Completion Pace
						<HelpTooltip 
							helpText={"The completion pace shows the ratio between your estimated completion time and the remaining time. Aim to keep this under the red \'success threshold\' line."}
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