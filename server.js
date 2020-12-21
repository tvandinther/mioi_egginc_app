const express = require("express")
const path = require("path")
const rateLimit = require("express-rate-limit")
const compression = require("compression")
const express_graphql = require("express-graphql");
const { buildSchema } = require("graphql");
const { importSchema } = require("graphql-import");
const GQLResolvers = require("./graphql/index.js")
const contractPageHandler = require("./side_effects/contract_page_handler")

const app = express();

// ==================== API ====================

const eggincAPILimiter = rateLimit({
    windowMS : 60 * 1000, // 1 minute
    max: 50,
    message : "Too many requests to the Egg, Inc. API. Please try again in 1 minute."
});

app.use('/api', 
    eggincAPILimiter,
    express_graphql({
        schema : buildSchema(importSchema('./graphql/schema.graphql')),
        rootValue : GQLResolvers,
        graphiql : false
    })    
);

// ==================== EXPRESS ====================

app.use(compression())
app.use(express.static('public'))

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
	contractPageHandler.init()
})

// ==================== PORT ====================

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`listening on port ${PORT}`))