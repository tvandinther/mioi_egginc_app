const initialState = {
    activeContracts: {
        fetching: false,
        fetched: false,
        error: null,
        contractsList: []
    },
    shownContracts: {},
    viewContract: null,
}

export default function reducer(state=initialState, action) {
    switch(action.type) {
        case "GET_ACTIVE_CONTRACTS_PENDING": {
            return {...state, activeContracts: {
                ...state.activeContracts,
                fetching: true,
            }}
        }
        case "GET_ACTIVE_CONTRACTS_FULFILLED": {
            return {...state, 
                    activeContracts: {
                    ...state.activeContracts,
                    fetching: false,
                    fetched: true,
                    contractsList: action.payload.data.activeContracts,
                }
            }
        }
        case "GET_ACTIVE_CONTRACTS_REJECTED": {
            return {...state, activeContracts: {
                ...state.activeContracts,
                error: action.payload,
            }}
        }
        case "SHOW_CONTRACT": {
            return {...state,
                viewContract: true
            }
        }
        case "HIDE_CONTRACT": {
            return {...state,
                viewContract: false
            }
        }
        case "UPDATE_SHOWN_CONTRACTS": {
            return {...state,
                shownContracts: {
                    ...state.shownContracts,
                    ...action.payload,
                }
            }
        }
        default: {
            return state
        }
    }
}