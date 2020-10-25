export default interface AppRedux {
	cardStates: {
		[key: string]: any,
	},
	news: {
		posts: Post[],
		fetched: boolean,
		fetching: boolean,
	}
}

type PostBodyType = "markdown"

export interface Post {
	author: string,
	body: string,
	bodyType: PostBodyType,
	timePosted: number,
	title: string,
}