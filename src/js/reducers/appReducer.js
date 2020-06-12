const initialState = {
	news: {
		fetched: false,
	}
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
		default: {
			return state
		}
	}
}