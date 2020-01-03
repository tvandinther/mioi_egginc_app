import React from "react"
import * as eiTools from "../../tools/eggincTools"
import ContractCardProgressBar from "./ContractCardProgressBar"
import ContractCardBody from "./ContractCardBody"
import { useTheme } from "@material-ui/core/styles"
import ContractCardHeader from "./ContractCardHeader"

export default function ContractCard(props) {
    const theme = useTheme()
    const style = {
        
    }
    
    
    const contractLength = (60 * 60 * 24 * 21)
    const barProgress = ((new Date() / 1000) - (props.contract.validUntil - contractLength)) / contractLength
    const expireString = eiTools.getExpireETA(props.contract.validUntil, true)
    const progressBarHoverText =  expireString <= 0 ? "Expired!" : "Expires in " + expireString
    return (
        <div style={style} className="ContractCard card" id={props.contract.name}>
            <ContractCardHeader text={props.contract.title}/>
            <ContractCardProgressBar progress={barProgress} hoverText={progressBarHoverText}/>
            <ContractCardBody contract={props.contract}/>
        </div>
    )
}