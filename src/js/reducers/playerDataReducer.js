const initialState = {
    error: false,
    fetched: false,
}

export default function reducer(state=initialState, action) {
    switch(action.type) {
        case "VALIDATE_GAMEID_FULFILLED": {
			let data = action.payload.data.data.eggInc.playerData
			let newFarmsList = []
			for (let farm of data.farmsList) {
				newFarmsList.push({
					...farm,
					commonResearch: farm.commonResearchList.reduce((obj, research) => {
						obj[research.id] = research.level
						return obj
					}, {})
				})
			}

			let epicResearch = {}
			data.game.epicResearchList.forEach(research => {
				epicResearch[research.id] = research.level
			})

            if (data.userName) {
                return {
					...data,
					game: {
						...data.game,
						epicResearch: epicResearch,
					},
					farmsList: newFarmsList,
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
		case "CLEAR_GAMEID": {
			return {
				error: false,
				fetched: false,
			}
		}
        default: {
            return state
		}
    }
}