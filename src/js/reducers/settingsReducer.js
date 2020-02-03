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
        case "VALIDATE_GAMEID_FULFILLED": {
            let data = action.payload.data.data.eggInc.playerData
            if (data.userName) {
                return {
                    ...state,
                    playerData: {
                        ...data,
                        error: false,
                    }
                }
            }
        }
        case "VALIDATE_GAMEID_REJECTED": {
            return {
                ...state,
                playerData: {
                    ...state.playerData,
                    error: true,
                }
            }
        }
        case "SET_DARK_THEME": {
            return {
                ...state,
                darkTheme: action.payload
            }
        }
        default: {
            return state
        }
    }
}