import express from "express"
import listEndpoints from "express-list-endpoints"
import cors from "cors"
import { join } from "path"
import authorsRouter from "./services/authors/index.js"
import postsRouter from "./services/posts/index.js"
import filesRouter from "./services/files/index.js"
import { badRequestHandler, unauthorisedErrorHandler, notFoundHandler, internaServerlErrorHandler } from "./errorHandlers.js"

const server = express()

const publicFolderPath = join(process.cwd(), "/public")
// --------------------------GLOBAL MIDDLEWARES----------------------
server.use(express.static(publicFolderPath))
server.use(cors())
server.use(express.json())

// ---------------------------ENDPOINTS----------------------
server.use("/posts", postsRouter)
server.use("/authors", authorsRouter)
server.use("/files", filesRouter)
// --------------------------ERROR MIDDLEWARES--------------------
server.use(badRequestHandler)
server.use(unauthorisedErrorHandler)
server.use(notFoundHandler)
server.use(internaServerlErrorHandler)

const port = 3001

console.table(listEndpoints(server))

server.listen(port, () => {
    console.log("Server running on port", port)
})