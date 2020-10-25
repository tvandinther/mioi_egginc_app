import React from "react"
import FlexContainer from "../FlexContainer"
import IconLabel from "../IconLabel"
import { Timer, PeopleAlt, OfflineBolt } from '@material-ui/icons'
import * as eiTools from "../../tools/eggincTools"
import { Contract, Coop } from "../../../types/contract"
import { isCoop } from "../../../types/typeGuards"

export default function ContractIcons({ contract, coop }: {contract: Contract, coop: Coop | undefined}) {
    const coopIconText = (() => {
        if (contract.coopSize) {
            let string = contract.coopSize
			if (isCoop(coop) && coop.members) return coop.members.length + "/" + string
			else return string
        }
        return "0"
    })()

    return (
        <FlexContainer style={{gridArea: "icons"}}>
                    <IconLabel icon={Timer} label={eiTools.convertEpoch(contract.duration)}/>
                    <IconLabel icon={PeopleAlt} label={coopIconText}/>
                    <IconLabel icon={OfflineBolt} label={contract.boostTokenInterval ? `${contract.boostTokenInterval} min` : "No Boosts"}/>
        </FlexContainer>
    )
}