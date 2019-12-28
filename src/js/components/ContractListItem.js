import React, { useEffect } from "react"
import * as eiTools from "../tools/eggincTools"

export default function ContractListItem(props) {
    const colours = [
        "#f5675d",
        "#f5cf5d",
        "#a1f55d",
        "#5dcaf5",
        "#f55da6",
    ]
    const colour = colours[props.index % colours.length]
    useEffect(() => {
        props.updateShownContracts({
            [props.contract.name]: {
                index: props.index,
                colour: colour,
                searchValue: "",
            },
        })
    }, [])
    
    const timeLeft = eiTools.getExpireETA(props.contract.validUntil)
    return (
        <div className="ContractListItem" id={props.contract.name} style={{backgroundColor: colour}}>
            <img src={`/images/egg${props.contract.egg}.png`}></img>
            <h2 className="title">{props.contract.title}</h2>
            <h3 className="subtitle">{timeLeft > 0 ? `Valid for ${eiTools.convertEpoch(timeLeft)}` : `Expired!`}</h3>
        </div>
    )
}