const express = require("express")
const path = require("path")
const rateLimit = require("express-rate-limit")
const express_graphql = require("express-graphql");
const { buildSchema } = require("graphql");
const { importSchema } = require("graphql-import");
const GQLResolvers = require("./graphql/index.js")

const app = express();

const eggincAPILimiter = rateLimit({
    windowMS : 60 * 1000, // 1 minute
    max: 20,
    message : "Too many requests to the Egg, Inc. API. Please try again in 1 minute."
});

app.use('/api', 
    eggincAPILimiter,
    express_graphql({
        schema : buildSchema(importSchema('./graphql/schema.graphql')),
        rootValue : GQLResolvers,
        graphiql : true
    })    
);


app.use(express.static('public'))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

const port = 8080
app.listen(port, () => console.log(`listening on port ${port}`))