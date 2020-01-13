import eggTypes from "./tools/eggTypes.json"

export default {
    item: {
        egg,
        purchaseable: {
            hab,
            vehicle,
            steroid: {
                research,
                boost
            }
        }
    }
}

const item = {
    id: "",
    name: "",
    description: "",
    imgUrl: "",
    helpText: "",
}

const egg = {
    type: "",
    value: "",
    farmValueVisible: "",
    farmValueUnlock: "",
}

const purchaseable = {
    currency: "",
    baseCost: 0,
    costMultiplier: 1,
    maxPurchases: 1,
}

const steroid = {
    parameter: "",
    factor: 1,
    factorType: "",
}

const boost = {
    duration: 1
}

const research = {
    type: "",
    tier: 1,
}

const hab = {
    capacity: 1,
}

const vehicle = {
    capacity: 1,
}

// ENUMS

const currencyEnum = [
    "BOCKS",
    "GOLDEN_EGGS",
]

const researchEnum = [
    "COMMON",
    "EPIC",
]

const parameterEnum = [
    "LAYING_RATE",
    "HAB_CAPACITY",
]

const factorTypeEnum = [
    "SUM",
    "MULTIPLIER",
    "POWER",
]