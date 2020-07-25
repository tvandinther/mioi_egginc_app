import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import ContractCardRewards2 from "./ContractCardRewards"
import IconLabel from "../IconLabel"

import * as eiTools from "../../tools/eggincTools"
// import { Timer, PeopleAlt } from '@material-ui/icons'
import Timer from '@material-ui/icons/Timer'
import PeopleAlt from '@material-ui/icons/PeopleAlt'
import OfflineBolt from '@material-ui/icons/OfflineBolt'

const useStyle = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: "10px",
	},
	icons: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
	}
}))

export default function ContractCardDetails(props) {
    const classes = useStyle()
    return (
        <div className={classes.root}>
            <div className={classes.icons}>
                <IconLabel icon={Timer} label={eiTools.convertEpoch(props.contract.duration, true)}/>
                <IconLabel icon={PeopleAlt} label={props.contract.coopSize ? props.contract.coopSize : 0}/>
                <IconLabel icon={OfflineBolt} label={props.contract.boostTokenInterval ? `${props.contract.boostTokenInterval} min` : "No Boosts"}/>
            </div>
            <ContractCardRewards2 goals={props.contract.goals}/>
        </div>
    )
}