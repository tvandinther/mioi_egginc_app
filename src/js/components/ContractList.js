import React from "react"

import { Link } from "react-router-dom"
import ContractListItem from "./ContractListItem"

export default function ContractList(props) {
    if (!props.activeContracts.length) {
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
    const sortedContracts = props.activeContracts.sort(sortFunctions["validUntil"])
    const contractListItems = sortedContracts.map((contract, index) => {
        return (
            <Link onClick={props.showContract} to={`${props.match.url}/${contract.name}`} key={index}>
                <ContractListItem updateShownContracts={props.updateShownContracts} contract={contract} index={index} />
            </Link>
        )
    })
    return (
        <div className="ContractList">
            {contractListItems}
        </div>
    )
}