import React, { Props } from "react"
import { makeStyles } from "@material-ui/core/styles"
import ContractCardRewards from "./ContractCardRewards"
import IconLabel from "../IconLabel"

import { convertEpoch } from "../../tools/eggincTools"
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

export default function ContractCardDetails(props: Props<any>) {
    const classes = useStyle()
    return (
        <div className={classes.root}>
            <div className={classes.icons}>
                <IconLabel icon={Timer} label={convertEpoch(props.contract.duration, true)}/>
                <IconLabel icon={PeopleAlt} label={props.contract.coopSize ? props.contract.coopSize : 0}/>
                <IconLabel icon={OfflineBolt} label={props.contract.boostTokenInterval ? `${props.contract.boostTokenInterval} min` : "No Boosts"}/>
            </div>
            <ContractCardRewards goals={props.contract.goals}/>
        </div>
    )
}