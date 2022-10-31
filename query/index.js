const express = require("express")
const bodyParser = require("body-parser")
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
    handleEvent(type, data)
    
    res.send({})
})

app.listen(port, () => {
    console.log(`QUERY API SERVICE ${port}`)
    
    axios.get("http://localhost:4005/events")
    .then((datas) => {
        if(datas.length){
            datas.forEach(({type, data}) => handleEvent(type, data))
        }    
    })
    .catch((err) => {
        console.log(err.message)
    })
})

const handleEvent = (type, data) => {
    switch(type){
        case "PostCreated":
        posts.push(data);
        break;
        case "CommentCreated":
        comments.push(data);
        break;
        case "CommentUpdated":
        const index = comments.findIndex((comment) => comment.id == data.id)
        console.log(index)
        if(index){
            comments[index] = data
        }
        break;
    }
}