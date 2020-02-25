const initialState = {
    error: false,
    fetched: false,
}

export default function reducer(state=initialState, action) {
    switch(action.type) {
        case "VALIDATE_GAMEID_FULFILLED": {
            let data = action.payload.data.data.eggInc.playerData
            if (data.userName) {
                return {
                    ...data,
                    error: false,
                    fetched: true,
                }
            }
        }
        case "VALIDATE_GAMEID_REJECTED": {
            return {
                ...state,
                error: true,
            }
        }
        default: {
            return state
        }
    }
}