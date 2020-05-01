import axios from "axios"
import * as queries from "../tools/gqlQueries"

export function fetchNews(limit) {
	return {
		type: "FETCH_NEWS",
		payload: axios.post("/api", {
			operation: "fetchNews",
			query: queries.fetchNews,
			variables: {
				context: "egginc",
				limit: limit,
			}
		})
	}
}