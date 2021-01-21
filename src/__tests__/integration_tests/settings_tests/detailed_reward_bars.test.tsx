import React from "react"
import {detailedRewardsBar} from "../../../js/actions/settingsActions";
import {useDispatch} from "react-redux";
import {render} from "@testing-library/react";
import {CoopRewards} from "../../../js/components/ContractSummary/CoopSummary";
import {rewards} from "../../data/rewardData"

describe("DETAILED_REWARDS_BAR", () => {
    test("Should show a single bar when toggled off", () => {
        const dispatch = useDispatch()
        dispatch(detailedRewardsBar(false))
        const {findAllByTestId} = render(<CoopRewards rewards={rewards}/>)

        expect(findAllByTestId("rewards-bar")).toHaveLength(1)
    })

    test("Should show multiple bars for each reward when toggled on", () => {
        const dispatch = useDispatch()
        dispatch(detailedRewardsBar(true))
        const {findAllByTestId} = render(<CoopRewards rewards={rewards}/>)

        expect(findAllByTestId("rewards-bar")).toHaveLength(rewards.length)
    })
})

