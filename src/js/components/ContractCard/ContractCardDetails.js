import React from "react"
import { useTheme } from "@material-ui/core/styles"
import ContractCardRewards from "./ContractCardRewards"
import IconLabel from "../IconLabel"

import * as eiTools from "../../tools/eggincTools"
import { Timer, PeopleAlt } from '@material-ui/icons'

export default function ContractCardDetails(props) {
    const theme = useTheme()
    const style = {
        backgroundColor: theme.palette.common.white,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "10px",
    }
    const containerStyle = {
        flex: "1 1 0px",
    }
    
    return (
        <div style={style} className="ContractCardDetails">
            <div style={containerStyle}>
                <IconLabel icon={Timer} label={eiTools.convertEpoch(props.contract.duration, true)}/>
                <IconLabel icon={PeopleAlt} label={props.contract.coopSize ? props.contract.coopSize : 0}/>
            </div>
            <ContractCardRewards rewards={props.contract.rewards}/>
        </div>
    )
}