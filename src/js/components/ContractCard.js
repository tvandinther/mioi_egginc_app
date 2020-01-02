import React, { useEffect } from "react"
import * as eiTools from "../tools/eggincTools"
import ContractCardProgressBar from "./ContractCardProgressBar"
import ContractCardDetails from "./ContractCardDetails"

export default function ContractCard(props) {
    useEffect(() => {
        props.updateShownContracts({
            [props.contract.name]: {
                index: props.index,
                searchValue: "",
            },
        })
    }, [])
    const contractLength = (60 * 60 * 24 * 21)
    const barProgress = ((new Date() / 1000) - (props.contract.validUntil - contractLength)) / contractLength
    const expireString = eiTools.getExpireETA(props.contract.validUntil, true)
    const progressBarHoverText =  expireString <= 0 ? "Expired!" : "Expires in " + expireString
    console.log(progressBarHoverText)
    return (
        <div className="ContractCard card" id={props.contract.name}>
            <div className="ContractCardHeader">
                <h2 className="ContractTitle">{props.contract.title}</h2>
            </div>
            <ContractCardProgressBar progress={barProgress} hoverText={progressBarHoverText}/>
            <div className="ContractCardBody">
                <div className="ContractImageContainer">
                    <img src={`/images/egg${props.contract.egg}.png`}></img>
                </div>
                <ContractCardDetails />
            </div>
        </div>
    )
}