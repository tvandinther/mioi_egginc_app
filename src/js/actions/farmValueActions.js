export function setFarm(farm, game) {
    return {
        type: "SET_FARM",
        payload: {
            farm: farm,
            game: game,
        },
    }
}

export function setEgg(eggIndex) {
    return {
        type: "SET_EGG",
        payload: eggIndex
    }
}

export function setSilos(siloCount) {
    return {
        type: "SET_SILOS",
        payload: siloCount
    }
}

export function setPopulation(numChickens) {
    return {
        type: "SET_POPULATION",
        payload: numChickens
    }
}

export function setResearch(researchId, value, type="common") {
    return {
        type: "SET_RESEARCH",
        payload: {
            researchId: researchId,
            value: value,
            researchType: type,
        }
    }
}