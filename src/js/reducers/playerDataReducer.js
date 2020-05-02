const initialState = {
    error: false,
    fetched: false,
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
			
            if (data.userName) {
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

                return {
					...data,
					game: {
						...data.game,
						epicResearch: epicResearch,
					},
					farmsList: newFarmsList,
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
		case "CLEAR_GAMEID": {
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