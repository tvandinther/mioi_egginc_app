const initialState = {
    activeContracts: {
        fetching: false,
        fetched: false,
        error: null,
        contracts: {},
    },
    coopSearch: {},
    viewContract: null,
    coops: {},
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
            const contractIds = action.payload.data.activeContracts.map(contract => contract.name)
            const contracts = action.payload.data.activeContracts.reduce((obj, contract) => {
                obj[contract.name] = contract
                return obj
            }, {})
            const coopSearches = contractIds.reduce((obj, contractId) => {
                obj[contractId] = {
                    searchString: "",
                    searchFailed: false,
                    failedSearches: [],
                }
                return obj
            }, {})
            const coops = contractIds.reduce((obj, contractId) => {
                obj[contractId] = null
                return obj
            }, {})
            return {...state, 
                activeContracts: {
                    ...state.activeContracts,
                    fetching: false,
                    fetched: true,
                    contracts: contracts,
                },
                coopSearch: coopSearches,
                coops: coops,
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
        case "UPDATE_CONTRACT_COOP_SEARCH_STRING": {
            return {...state,
                coopSearch: {
                    ...state.coopSearch,
                    [action.payload.contractId]: {
                        ...state.coopSearch[action.payload.contractId],
                        searchString: action.payload.searchString,
                    }
                }
            }
        }
        case "GET_COOP_PENDING": {
            return {...state,
                coops: {
                    ...state.coops,
                    [action.meta.contractId]: {
                        ...state.coops[action.meta.contractId],
                        fetching: true,
                        error: null,
                    }
                }
            }
        }
        case "GET_COOP_FULFILLED": {
            return {...state,
                coops: {
                    ...state.coops,
                    [action.meta.contractId]: {
                        ...action.payload.data.data.eggInc.coop,
                        fetching: false,
                        fetched: true,
                    }
                }
            }
        }
        case "GET_COOP_REJECTED": {
            return {...state,
                coops: {
                    ...state.coops,
                    [action.meta.contractId]: {
                        ...state.coops[action.meta.contractId],
                        fetching: false,
                        error: action.payload,
                    }
                }
            }
        }
        default: {
            return state
        }
    }
}