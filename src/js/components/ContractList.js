import React from "react"
import { conenct, connect } from "react-redux"
import { Link } from "react-router-dom"
import ContractCard from "./ContractCard/ContractCard"
import { showContract } from "../actions/contractActions"
import { getExpireETA } from "../tools/eggincTools"

function ContractList(props) {
    if (!props.activeContracts.contracts) {
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
    const contractList = Object.values(props.activeContracts.contracts)
    const sortedContracts = contractList.sort(sortFunctions["validUntil"])
    const reversed = true
    if (reversed) {
        sortedContracts.reverse()
    }
    const contractListItems = sortedContracts.map((contract, index) => {
        // Anything valid for more than 30 days from now is put to the bottom
        let order = getExpireETA(contract.validUntil) < 60 * 60 * 24 * 30 ? index : 100 + index
        return (
            <Link style={{order: order}} onClick={props.showContract} to={`${props.match.url}/${contract.name}`} key={index}>
                <ContractCard contract={contract} index={index} />
            </Link>
        )
    })
    return (
        <div className="ContractList">
            {contractListItems}
        </div>
    )
}

const mapStateToProps = store => {
    const { contract: { activeContracts } } = store
    return {
        activeContracts,
    }
}

const mapDispatchToProps = {
    showContract
}

export default connect(mapStateToProps, mapDispatchToProps)(ContractList)