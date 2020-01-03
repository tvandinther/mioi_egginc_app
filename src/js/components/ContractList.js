import React from "react"

import { Link } from "react-router-dom"
import ContractCard from "./ContractCard/ContractCard"

export default function ContractList(props) {
    if (!props.activeContracts) {
        return (
            <p>Loading...</p>
        )
    }

    const sortFunctions = {
        validUntil: (a, b) => a.validUntil - b.validUntil,
        title: (a, b) => a.title > b.title ? -1 : 1,
        duration: (a, b) => a.duration - b.duration,
        coopSize: (a, b) => a.coopSize > b.coopSize,
    }
    const contractList = Object.values(props.activeContracts)
    const sortedContracts = contractList.sort(sortFunctions["validUntil"])
    const reversed = true
    if (reversed) {
        sortedContracts.reverse()
    }
    const contractListItems = sortedContracts.map((contract, index) => {
        return (
            <Link onClick={props.showContract} to={`${props.match.url}/${contract.name}`} key={index}>
                <ContractCard updateShownContracts={props.updateShownContracts} contract={contract} index={index} />
            </Link>
        )
    })
    return (
        <div className="ContractList">
            {contractListItems}
        </div>
    )
}