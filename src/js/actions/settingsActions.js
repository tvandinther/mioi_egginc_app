import axios from "axios"
import * as queries from "../tools/gqlQueries"

export function blah(bool) {
    return {
        type: "blah",
        payload: bool
    }
}

export function setPlayerId(playerId) {
    return {
        type: "SET_GAMEID",
        payload: playerId,
    }
}

export function validatePlayerId(playerId) {
    return {
        type: "VALIDATE_GAMEID",
        meta: {
            playerId: playerId,
        },
        payload: axios.post("/api", {
            operation: "getUser",
            query: queries.getPlayerData,
            variables: {
                playerId: playerId,
            },
        })
    }
}

export function setDarkTheme(bool) {
    return {
        type: "SET_DARK_THEME",
        payload: bool,
    }
}