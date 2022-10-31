const express = require("express")
const bodyParser = require("body-parser")
const { randomBytes } = require("crypto")

const app = express()
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

    res.status(201).send(posts[id])
})

app.listen(port, () => {
    console.log(`POST API SERVICE ${port}`)
})