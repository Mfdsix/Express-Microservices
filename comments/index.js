const express = require("express")
const bodyParser = require("body-parser")
const { randomBytes } = require("crypto")

const app = express()
app.use(bodyParser.json())
const port = 4001

const comments = []

app.get('/posts/:postId/comments', (req, res) => {
    res.send(comments.filter(({postId}) => postId == req.params.postId))
})
app.post('/posts/:postId/comments', (req, res) => {
    const id = randomBytes(4).toString('hex')
    const {
        comment
    } = req.body

    comments.push({
        post_id: req.params.postId,
        id,
        comment
    })

    res.status(201).send(comments[comments.length-1])
})

app.listen(port, () => {
    console.log(`COMMENT API SERVICE ${port}`)
})