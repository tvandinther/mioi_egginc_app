const mioiAPI = require("../mioiAPI")

const fetchNews = function(args) {
	return mioiAPI.fetchNews(args.context, args.limit)
}

module.exports = {
	generateAPIKey: null,
	fetchNews: fetchNews,
}