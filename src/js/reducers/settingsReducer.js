const initialState = {
    playerId: null,
    playerData: {
        error: false,
    },
	darkTheme: false,
	hideTooltips: false,
	detailedRewardsBar: false,
	hourlyEggLayingRate: true,
}

export default function reducer(state=initialState, action) {
    switch(action.type) {
        case "SET_GAMEID": {
            return {
                ...state,
                playerId: action.payload,
            }
		}
		case "CLEAR_GAMEID": {
			return {
				...state,
				playerId: null,
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