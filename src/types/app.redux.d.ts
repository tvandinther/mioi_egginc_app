export default interface AppRedux {
	cardStates: {
		[key: string]: any,
	},
	news: {
		posts: NewsPost[],
		fetched: boolean,
		fetching: boolean,
	}
}

export type PostBodyType = "markdown" // | "newType"

export interface NewsPost {
	author: string,
	body: string,
	bodyType: PostBodyType,
	timePosted: number,
	title: string,
}