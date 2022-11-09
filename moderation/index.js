const express = require("express")
const bodyParser = require("body-parser")
const axios = require("axios")

const app = express()
app.use(bodyParser.json())
const port = 4003

app.post('/events', async (req, res) => {
    const { type, data } = req.body

    switch(type){
        case 'CommentCreated':
            const status = data.content.includes('rude') ? 'rejected' : 'approved'
            await axios.post("http://event-bus-service:4005/events", {
                type: "CommentModerated",
                data: {
                    ...data,
                    status
                }
            })
            break;
    }

    res.send({})
})

app.listen(port, () => {
    console.log(`MODERATION API SERVICE ${port}`)
})