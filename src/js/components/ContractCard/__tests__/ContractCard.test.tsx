import React from "react"
import {render} from "@testing-library/react"
import contractData from "../../../../__tests__/data/contractData.json"
import ContractCard from "../ContractCard"

describe("<ContractCard />", () => {
    test("Should display a contract card with images and text", () => {
        const contract = contractData.activeContracts[0]
        const {findByText} = render(<ContractCard contract={contract} index={0}/>)
        const cardTitle = findByText(contract.name)

        expect(cardTitle).toBeTruthy();
    })
})