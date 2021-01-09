import React, {useState} from "react"
import * as eiTools from "../../tools/eggincTools"
import ContractCardProgressBar from "./ContractCardProgressBar"
import ContractCardBody from "./ContractCardBody"
import {Card} from "@material-ui/core"
import ContractCardHeader from "./ContractCardHeader"

import useStyle from "./styles"
import {Contract} from "../../../types/contract"

export default function ContractCard(props: {contract: Contract, index: number}) {
    const classes = useStyle()
    let [raised, setRaised] = useState(false)
    const toggleRaised = () => {
        setRaised(!raised)
    }

    const contractLength = (60 * 60 * 24 * 21)
    const barProgress = ((Date.now() / 1000) - (props.contract.validUntil - contractLength)) / contractLength
    const expireString = eiTools.getExpireETA(props.contract.validUntil, true)
    const progressBarHoverText =  expireString <= 0 ? "Expired!" : "Expires in " + expireString
    return (
        <Card data-testid="contract-card" raised={raised} onMouseOver={toggleRaised} onMouseOut={toggleRaised}
              className={classes.root} id={props.contract.name}>
            <ContractCardHeader text={props.contract.title}/>
            <ContractCardProgressBar progress={barProgress} hoverText={progressBarHoverText}/>
            <ContractCardBody contract={props.contract}/>
        </Card>
    )
}