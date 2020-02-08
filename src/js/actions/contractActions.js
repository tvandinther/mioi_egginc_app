import axios from "axios"
import * as queries from "../tools/gqlQueries"

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

export function updateContractCoopSearchString(contractId, searchString) {
    return {
        type: "UPDATE_CONTRACT_COOP_SEARCH_STRING",
        payload: {
            contractId: contractId,
            searchString: searchString,
        }
    }
}

export function getCoop(coopName, contractId, player=false) {
    return {
        type: "GET_COOP",
        meta: {
            coopName: coopName,
            contractId: contractId,
            player: player,
        },
        payload: axios.post("/api", {
            operation: "getCoop",
            query: queries.getCoop,
            variables: {
                coopName: coopName,
                contractName: contractId,
            },
        })
    }
}