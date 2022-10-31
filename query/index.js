const express = require("express")
const bodyParser = require("body-parser")
const { randomBytes } = require("crypto")
const cors = require("cors")

const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = 4002

const posts = []
const comments = []

app.get('/posts', (req, res) => {
    res.send(posts.map((post) => {
        return {
            ...post,
            comments: comments.filter(({post_id}) => post_id == post.id)
        }
    }))
})
app.post('/events', (req, res) => {
    const { type, data } = req.body

    switch(type){
        case "PostCreated":
            posts.push(data);
            break;
        case "CommentCreated":
            comments.push(data);
            break;
    }

    res.send({})
})

app.listen(port, () => {
    console.log(`QUERY API SERVICE ${port}`)
})