import { calculateFarmStats } from "../tools/eggincTools"
import { useStore, useSelector } from "react-redux"

export function setFarm(farm, game) {
    return {
        type: "SET_FARM",
        payload: {
            farm: farm,
            game: game,
        },
    }
}

export function setMysticalEgg(eggType, value) {
	return {
		type: "SET_MYSTICAL_EGG",
		payload: {
			eggType: eggType,
			value: value,
		}
	}
}

export function setEgg(eggIndex) {
    return {
        type: "SET_EGG",
        payload: eggIndex
    }
}

export function setHab(habIndex, slotIndex) {
    return {
        type: "SET_HAB",
        payload: {
			hab: habIndex,
			slot: slotIndex,
		}
    }
}

export function setEggsShipped(value) {
	return {
		type: "SET_EGGS_SHIPPED",
		payload: value,
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

export function calculateStats(farm, game) {
	return {
		type: "CALCULATE_FARM_STATS",
		payload: calculateFarmStats(farm, game)
	}
}