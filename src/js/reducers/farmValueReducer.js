import blankFarm from "../tools/blankFarm"

const initialState = {
    ...blankFarm,
}

export default function reducer(state=initialState, action) {
    switch(action.type) {
        case "SET_FARM": {
            return {
                ...state,
                farm: action.payload.farm,
                game: action.payload.game,
            }
        }
        case "SET_EGG": {
            return {
                ...state,
                farm: {
                    ...state.farm,
                    eggType: action.payload
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
            const alterArray = item => {
                if (item.id === action.payload.researchId) {
                    return {
                        ...item,
                        level: action.payload.value
                    }
                }
                return item
            }
            let newCommonResearchList = state.farm.commonResearchList.map(alterArray)
            let newEpicResearchList = state.game.epicResearchList.map(alterArray)
            return {
                ...state,
                farm: {
                    ...state.farm,
                    commonResearchList: newCommonResearchList,
                },
                game: {
                    ...state.game,
                    epicResearchList: newEpicResearchList
                }
            }
        }
        default: {
            return state
        }
    }
}