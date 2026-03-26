import "dotenv/config"
import express from "express"


const app = express()
const port = process.env.PORT

app.use(express.json())

app.get("/", (req, res) => {
    res.end("Hey there")
})

app.listen(port, () => {
    console.log(`App is listening on: http://localhost:${port}`)
})