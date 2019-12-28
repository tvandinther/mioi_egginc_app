import axios from "axios"

export function getActiveContracts() {
    return {
        type: "GET_ACTIVE_CONTRACTS",
        payload: axios.get("https://mioi-www-public.storage.googleapis.com/activeContracts.json")
    }
}

export function showContract() {
    return {
        type: "SHOW_CONTRACT",
    }
}

export function hideContract() {
    return {
        type: "HIDE_CONTRACT",
    }
}

export function updateShownContracts(contractInfo) {
    return {
        type: "UPDATE_SHOWN_CONTRACTS",
        payload: contractInfo,
    }
}

export function updateContractCoopSearchString(contractId, searchString) {
    return {
        type: "UPDATE_CONTRACT_COOP_SEARCH_STRING",
        payload: {
            contractId: contractId,
            searchString: searchString,
        }
    }
}