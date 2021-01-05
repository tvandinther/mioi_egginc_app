import React from "react"
import ContractCardRewards from "./ContractCardRewards"
import IconLabel from "../IconLabel"

import { convertEpoch } from "../../tools/eggincTools"
import Timer from '@material-ui/icons/Timer'
import PeopleAlt from '@material-ui/icons/PeopleAlt'
import OfflineBolt from '@material-ui/icons/OfflineBolt'

import useStyle from "./styles"
import { Contract } from "../../../types/contract"

export default function ContractCardDetails({ contract }: { contract: Contract }) {
	const classes = useStyle()
	
    return (
        <div className={classes.details}>
            <div className={classes.icons}>
                <IconLabel icon={Timer} label={convertEpoch(contract.duration)}/>
                <IconLabel icon={PeopleAlt} label={contract.coopSize ? contract.coopSize : 0}/>
                <IconLabel icon={OfflineBolt} label={contract.boostTokenInterval ? `${contract.boostTokenInterval} min` : "No Boosts"}/>
            </div>
            <ContractCardRewards goals={contract.goals}/>
        </div>
    )
}