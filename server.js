const express = require("express")
const path = require("path")

const app = express();

app.use(express.static('public'))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

const port = 8080
app.listen(port, () => console.log(`listening on port ${port}`))