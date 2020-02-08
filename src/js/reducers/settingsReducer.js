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