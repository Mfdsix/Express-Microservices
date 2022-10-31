const express = require("express")
const bodyParser = require("body-parser")
const { randomBytes } = require("crypto")
const cors = require("cors")
const axios = require("axios")

const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = 4000

const posts = []

app.get('/posts', (req, res) => {
    res.send(posts)
})
app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex')
    const {
        title
    } = req.body

    const data = {
        id, title
    }
    posts.push(data)

    await axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data
    })

    res.status(201).send(posts[posts.length-1])
})

app.listen(port, () => {
    console.log(`POST API SERVICE ${port}`)
})