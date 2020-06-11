const initialState = {
    playerId: null,
    playerData: {
        error: false,
    },
    darkTheme: false,
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
        default: {
            return state
        }
    }
}