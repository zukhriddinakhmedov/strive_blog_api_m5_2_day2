import express from "express"
import listEndpoints from "express-list-endpoints"
import authorsRouter from "./services/authors/index.js"


const server = express()

server.use(express.json())

server.use("/authors", authorsRouter)

const port = 3001

console.table(listEndpoints(server))

server.listen(port, () => {
    console.log("Server running on port", port)
})