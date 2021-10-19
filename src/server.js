import express from "express"
import listEndpoints from "express-list-endpoints"

const server = express()

server.use(express.json())


const port = 3001

console.table(listEndpoints(server))

server.listen(port, () => {
    console.log("Server running on port", port)
})