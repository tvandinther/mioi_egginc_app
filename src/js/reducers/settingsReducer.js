const initialState = {
    playerId: null,
    playerData: {
        error: false,
    },
	darkTheme: false,
	hideTooltips: false,
	detailedRewardsBar: false,
	hourlyEggLayingRate: true,
	savedIds: {},
}

export default function reducer(state=initialState, action) {
    switch(action.type) {
		case "VALIDATE_GAMEID_FULFILLED": {
			const data = action.payload.data.data.eggInc.playerData
			if (data.userName) {
				return {
					...state,
					playerId: data.userId,
					savedIds: {
						...state.savedIds,
						[data.userId]: data.userName,
					}
				}
			}
			else return state
		}
        case "SET_GAMEID": {
            return {
                ...state,
                playerId: action.payload,
            }
		}
		case "ADD_GAMEID": {
			return {
				...state,
				savedIds: {
					...state.savedIds,
					[action.payload.playerId]: action.payload.playerName
				}
			}
		}
		case "CLEAR_PLAYER_GAMEID": {
			const newSavedIds = { ...state.savedIds }
			delete newSavedIds[action.payload]
			const objectSize = Object.keys(newSavedIds).length
			const newPlayerId = objectSize > 0 ? Object.keys(newSavedIds)[Object.keys(newSavedIds).length - 1] : null // set to last entry or null if none
			return {
				...state,
				playerId: newPlayerId,
				savedIds: newSavedIds,
			}
		}
		case "CLEAR_ALL_GAMEID": {
			return {
				...state,
				playerId: null,
				savedIds: {},
			}
		}
        case "SET_DARK_THEME": {
            return {
                ...state,
                darkTheme: action.payload,
            }
		}
		case "HIDE_TOOLTIPS": {
			return {
				...state,
				hideTooltips: action.payload,
			}
		}
		case "DETAILED_REWARDS_BAR": {
			return {
				...state,
				detailedRewardsBar: action.payload,
			}
		}
		case "HOURLY_EGG_LAYING_RATE": {
			return {
				...state,
				hourlyEggLayingRate: action.payload,
			}
		}
        default: {
            return state
        }
    }
}