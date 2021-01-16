import React from "react"
import {fireEvent, render} from "@testing-library/react"
import contractData from "../../../../__tests__/data/contractData.json"
import ContractCard from "../ContractCard"

describe("<ContractCard />", () => {
    test("Should display a contract card with the correct title", () => {
        const contract = contractData.activeContracts[0]
        const {findByText} = render(<ContractCard contract={contract} index={0}/>)
        const cardTitle = findByText(contract.name)

        expect(cardTitle).toBeTruthy();
    })

    test("Should appear raised when hovered over", () => {
        const contract = contractData.activeContracts[0]
        const {getByTestId} = render(<ContractCard contract={contract} index={0}/>)

        const card = getByTestId("contract-card")
        let classesBeforeHover = card.className
        fireEvent.mouseOver(card)
        let classesAfterHover = card.className

        expect(classesBeforeHover == classesAfterHover).toBe(false)
    })
})