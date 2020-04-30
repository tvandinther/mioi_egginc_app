const { Firestore } = require("@google-cloud/firestore")

const firestore = new Firestore()

var exports = module.exports = {}

exports.fetchNews = async function(context, limit=1) {
	return await firestore.collection('dev-news').where('timePosted', '<', new Date() / 1000).where('type', '==', context).limit(limit).get().then(querySnapshot => {
		return querySnapshot.docs.map(docRef => docRef.data())
	})
}