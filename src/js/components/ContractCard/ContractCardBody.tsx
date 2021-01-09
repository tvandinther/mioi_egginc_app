import React from "react"
import ContractCardImage from "./ContractCardImage"
import ContractCardDetails from "./ContractCardDetails"
import useStyles from "./styles"
import { Contract } from "../../../types/contract"

export default function ContractCardBody({ contract } : { contract: Contract }) {
    const classes = useStyles()

    return (
        <div className={classes.body}>
            <ContractCardImage src={`/images/egg${contract.egg}.png`}/>
            <ContractCardDetails contract={contract}/>
        </div>
    )
}