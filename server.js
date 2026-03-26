import "dotenv/config"
import express from "express"
import connectDb from "./src/db/connect.db.js"

const app = express()
const port = process.env.PORT

app.use(express.json())

app.get("/", (req, res) => {
    res.end("Hey there")
})

connectDb()

app.listen(port, () => {
    console.log(`App is listening on: http://localhost:${port}`)
})