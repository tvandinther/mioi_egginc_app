import React from "react"
import FlexContainer from "../FlexContainer"
import IconLabel from "../IconLabel"
import { Timer, PeopleAlt, OfflineBolt } from '@material-ui/icons'
import * as eiTools from "../../tools/eggincTools"
// import Timer from '@material-ui/icons/Timer'
// import PeopleAlt from '@material-ui/icons/PeopleAlt'
// import OfflineBolt from '@material-ui/icons/OfflineBolt'

export default function ContractIcons(props) {
    const contract = props.contract
    const coop = props.coop
    const coopIconText = (() => {
        if (contract.coopSize) {
            let string = contract.coopSize
			if (coop && coop.members) return coop.members.length + "/" + string
			else return string
        }
        return "0"
    })()

    return (
        <FlexContainer style={{gridArea: "icons"}}>
                    <IconLabel icon={Timer} label={eiTools.convertEpoch(contract.duration, true)}/>
                    <IconLabel icon={PeopleAlt} label={coopIconText}/>
                    <IconLabel icon={OfflineBolt} label={contract.boostTokenInterval ? `${contract.boostTokenInterval} min` : "No Boosts"}/>
        </FlexContainer>
    )
}