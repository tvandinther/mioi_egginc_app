import {ContractGoals, ContractReward} from "../../types/contract";

export const rewardGoals: ContractGoals = {
    "standard": [
        {
            "subtype": "",
            "type": "SOUL_EGGS",
            "difficulty": 1000,
            "goal": 30000000000000,
            "quantity": 10000
        },
        {
            "subtype": "",
            "quantity": 25000,
            "goal": 250000000000000,
            "difficulty": 1000000,
            "type": "GOLDEN_EGGS"
        },
        {
            "goal": 2000000000000000,
            "subtype": "",
            "type": "PROPHECY_EGGS",
            "quantity": 1,
            "difficulty": 1000000000
        }
    ],
    "elite": [
        {
            "difficulty": 50000000000,
            "type": "PIGGY_BANK",
            "subtype": "",
            "goal": 30000000000000000,
            "quantity": 150000
        },
        {
            "goal": 400000000000000000,
            "quantity": 1,
            "difficulty": 10000000000000,
            "type": "PROPHECY_EGGS",
            "subtype": ""
        },
        {
            "quantity": 100000,
            "difficulty": 1000000000000000,
            "type": "GOLDEN_EGGS",
            "subtype": "",
            "goal": 1500000000000000000
        }
    ]
}

export const legacyRewardGoals: ContractReward[] = [
    {
        "quantity": 192,
        "type": "GOLDEN_EGGS",
        "goal": 100000,
        "difficulty": 10,
        "subtype": null
    },
    {
        "quantity": 2,
        "subtype": null,
        "difficulty": 50,
        "type": "PIGGY_MULTIPLY",
        "goal": 500000000
    }
]

export const rewards: ContractReward[] = rewardGoals.elite