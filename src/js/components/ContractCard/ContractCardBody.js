import React from "react"
import ContractCardImage from "./ContractCardImage"
import ContractCardDetails from "./ContractCardDetails"

export default function ContractCardBody(props) {


    return (
        <div className="ContractCardBody">
            <ContractCardImage src={`/images/egg${props.contract.egg}.png`}/>
            <ContractCardDetails contract={props.contract}/>
        </div>
    )
}