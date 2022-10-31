const express = require("express")
const bodyParser = require("body-parser")
const { randomBytes } = require("crypto")
const cors = require("cors")

const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = 4001

const comments = []

app.get('/posts/:postId/comments', (req, res) => {
    res.send(comments.filter(({post_id}) => post_id == req.params.postId))
})
app.post('/posts/:postId/comments', (req, res) => {
    const id = randomBytes(4).toString('hex')
    const {
        content
    } = req.body

    comments.push({
        post_id: req.params.postId,
        id,
        content
    })

    res.status(201).send(comments[comments.length-1])
})

app.listen(port, () => {
    console.log(`COMMENT API SERVICE ${port}`)
})