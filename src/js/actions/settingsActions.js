import axios from "axios"
import * as queries from "../tools/gqlQueries"

export function setPlayerId(playerId) {
    return {
        type: "SET_GAMEID",
        payload: playerId,
    }
}

export function validatePlayerId(playerId) {
	return {
		type: "",
		payload: null
	}
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

export function addGameId(playerId, playerName) {
	return {
		type: "ADD_GAMEID",
		payload: {
			playerId: playerId,
			playerName: playerName,
		}
	}
}

export function clearPlayerId(playerId) {
	return {
		type: "CLEAR_PLAYER_GAMEID",
		payload: playerId,
	}
}

export function clearAllPlayerId() {
	return {
		type: "CLEAR_ALL_GAMEID",
	}
}

export function setDarkTheme(bool) {
    return {
        type: "SET_DARK_THEME",
        payload: bool,
    }
}

export function hideTooltips(bool) {
	return {
		type: "HIDE_TOOLTIPS",
		payload: bool,
	}
}

export function detailedRewardsBar(bool) {
	return {
		type: "DETAILED_REWARDS_BAR",
		payload: bool,
	}
}

export function hourlyEggLayingRate(bool) {
	return {
		type: "HOURLY_EGG_LAYING_RATE",
		payload: bool,
	}
}