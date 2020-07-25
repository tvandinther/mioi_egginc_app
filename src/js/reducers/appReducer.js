const initialState = {
	news: {
		fetched: false,
	},
	cardStates: {}
}

export default function reducer(state=initialState, action) {
    switch(action.type) {
		case "FETCH_NEWS_PENDING": {
			return {
				...state,
				news: {
					...state.news,
					fetching: true,
				}
			}
		}
		case "FETCH_NEWS_FULFILLED": {
			let data = action.payload.data.data.mioi.fetchNews
			return {
				...state,
				news: {
					posts: data,
					fetched: true,
					fetching: false,
				},
			}
		}
		case "SET_COLLAPSED_CARD": {
			let newCardStates = { ...state.cardStates }
			if (action.payload.collapsed) {
				newCardStates[action.payload.cardID] = {
					collapsed: true,
				}
			}
			else {
				delete newCardStates[action.payload.cardID]
			}
			return {
				...state,
				cardStates: newCardStates
			}
		}
		default: {
			return state
		}
	}
}