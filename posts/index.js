const express = require("express")
const bodyParser = require("body-parser")
const { randomBytes } = require("crypto")
const cors = require("cors")

const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = 4000

const posts = []

app.get('/posts', (req, res) => {
    res.send(posts)
})
app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex')
    const {
        title
    } = req.body

    posts.push({
        id, title
    })

    res.status(201).send(posts[posts.length-1])
})

app.listen(port, () => {
    console.log(`POST API SERVICE ${port}`)
})