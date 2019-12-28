const initialState = {
    activeContracts: {
        fetching: false,
        fetched: false,
        error: null,
        contractsList: [],
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
            const contractsList = action.payload.data.activeContracts.map(contract => {
                return {...contract,
                    coopSearch: {
                        searchString: "",
                        searchFailed: false,
                        failedSearches: [],
                    },
                    coopData: {},
                }
            })
            return {...state, 
                activeContracts: {
                    ...state.activeContracts,
                    fetching: false,
                    fetched: true,
                    contractsList: contractsList,
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
        case "UPDATE_CONTRACT_COOP_SEARCH_STRING": {
            const updatedContractsList = state.activeContracts.contractsList.map(contract => {
                if (contract.name === action.payload.contractId) {
                    contract.coopSearch.searchString = action.payload.searchString
                }
                return contract
            })
            return {...state,
                activeContracts: {
                    contractsList: updatedContractsList,
                }

            }
        }
        default: {
            return state
        }
    }
}