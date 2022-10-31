const express = require("express")
const bodyParser = require("body-parser")
const { randomBytes } = require("crypto")
const cors = require("cors")
const axios = require("axios")

const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = 4001

const comments = []

app.get('/posts/:postId/comments', (req, res) => {
    res.send(comments.filter(({post_id}) => post_id == req.params.postId))
})
app.post('/posts/:postId/comments', async(req, res) => {
    const id = randomBytes(4).toString('hex')
    const {
        content
    } = req.body

    const data = {
        post_id: req.params.postId,
        id,
        content
    }

    comments.push(data)

    await axios.post("http://localhost:4005", {
        type: "CommentCreated",
        data: data
    })

    res.status(201).send(comments[comments.length-1])
})

app.listen(port, () => {
    console.log(`COMMENT API SERVICE ${port}`)
})