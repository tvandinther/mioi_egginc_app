const initialState = {
    error: false,
    fetched: false,
	fetching: false,
}

export default function reducer(state=initialState, action) {
    switch(action.type) {
		case "VALIDATE_GAMEID_PENDING": {
			return {
				...state,
				fetching: true,
			}
		}
        case "VALIDATE_GAMEID_FULFILLED": {
			let data = action.payload.data.data.eggInc.playerData

			if (data.farms.length > 0) {
				if (data.userName == "") data.userName = "unknown"
				let newfarms = []
				for (let farm of data.farms) {
					newfarms.push({
						...farm,
						commonResearch: farm.commonResearch.reduce((obj, research) => {
							obj[research.id] = research.level
							return obj
						}, {})
					})
				}

				let epicResearch = {}
				data.game.epicResearch.forEach(research => {
					epicResearch[research.id] = research.level
				})

				return {
					...data,
					game: {
						...data.game,
						epicResearch: epicResearch,
					},
					farms: newfarms,
					error: false,
					fetched: true,
					fetching: false,
				}
            }
        }
        case "VALIDATE_GAMEID_REJECTED": {
            return {
                ...state,
				error: true,
				fetched: false,
				fetching: false,
            }
		}
		case "CLEAR_ALL_GAMEID":
		case "CLEAR_PLAYER_GAMEID": {
			return {
				error: false,
				fetched: false,
				fetching: false,
			}
		}
		case "DISABLE_PLAYER_ID": {
			return {
				error: false,
				fetched: false,
				fetching: false,
			}
		}
        default: {
            return state
		}
    }
}