import React from "react"
import { useTheme, makeStyles } from "@material-ui/core/styles"
import ContractCardRewards from "./ContractCardRewards"
import IconLabel from "../IconLabel"

import * as eiTools from "../../tools/eggincTools"
// import { Timer, PeopleAlt } from '@material-ui/icons'
import Timer from '@material-ui/icons/Timer'
import PeopleAlt from '@material-ui/icons/PeopleAlt'

const useStyle = makeStyles(theme => ({
    root: {
        gridArea: "details",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "10px",
        borderBottomRightRadius: "inherit",
    }
}))

export default function ContractCardDetails(props) {
    const theme = useTheme()
    const classes = useStyle()
    const style = {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "10px",
    }
    const containerStyle = {
        flex: "1 1 0px",
    }
    
    return (
        <div style={style} className={classes.root}>
            <div style={containerStyle}>
                <IconLabel icon={Timer} label={eiTools.convertEpoch(props.contract.duration, true)}/>
                <IconLabel icon={PeopleAlt} label={props.contract.coopSize ? props.contract.coopSize : 0}/>
            </div>
            <ContractCardRewards rewards={props.contract.rewards}/>
        </div>
    )
}