import blankFarm from "../tools/blankFarm"
import {calculateFarmStats} from "../tools/eggincTools"

const initialState = {
	...blankFarm,
	stats: calculateFarmStats(blankFarm.farm, blankFarm.game)
}

export default function reducer(state=initialState, action) {
    switch(action.type) {
		case "VALIDATE_GAMEID_FULFILLED": {
			let data = action.payload.data.data.eggInc.playerData
			if (data.userName) {
				let epicResearch = {}
				data.game.epicResearch.forEach(research => {
					epicResearch[research.id] = research.level
				})
				return {
					...state,
					game: {
						...data.game,
						epicResearch: epicResearch,
					},
				}
			}
		}
        case "SET_FARM": {
            return {
                ...state,
                farm: action.payload.farm,
                game: action.payload.game,
            }
		}
		case "SET_MYSTICAL_EGG": {
			let targetDict = {
				"SOUL_EGGS": "soulEggs",
				"PROPHECY_EGGS": "prophecyEggs"
			}
			return {
				...state,
				game: {
					...state.game,
					[targetDict[action.payload.eggType]]: action.payload.value
				}
			}
		}
        case "SET_EGG": {
            return {
                ...state,
                farm: {
                    ...state.farm,
                    eggType: Number(action.payload)
                }
            }
		}
		case "SET_HAB": {
			let habs = [...state.farm.habs]
			habs[action.payload.slot] = action.payload.hab
			return {
				...state,
				farm: {
					...state.farm,
					habs: habs,
				}
			}
		}
		case "SET_EGGS_SHIPPED": {
			return {
				...state,
				farm: {
					...state.farm,
					eggsPaidFor: action.payload,
				}
			}
		}
        case "SET_SILOS": {
            return {
                ...state,
                farm: {
                    ...state.farm,
                    silosOwned: action.payload,
                }
            }
        }
        case "SET_POPULATION": {
            return {
                ...state,
                farm: {
                    ...state.farm,
                    numChickens: action.payload
                }
            }
		}
        case "SET_RESEARCH": {
            if (action.payload.researchType === "common") {
				return {
					...state,
					farm: {
						...state.farm,
						commonResearch: {
							...state.farm.commonResearchMap,
							...action.payload.research,
						}
					}
				}
			}
			else {
				return {
					...state,
					game: {
						...state.game,
						epicResearch: {
							...state.game.epicResearchMap,
							...action.payload.research,
						}
					}
				}
			}
		}
		case "CALCULATE_FARM_STATS": {
			return {
				...state,
				stats: action.payload
			}
		}
        default: {
            return state
        }
    }
}