import express from "express"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import fs from "fs"
import uniqid from "uniqid"
import createHttpError from "http-errors"
import { validationResult } from "express-validator"
import { postsValidation } from "./validation.js"


const postsRouter = express.Router()

const postsJsonPath = join(dirname(fileURLToPath(import.meta.url)), "posts.json")

const readPosts = () => JSON.parse(fs.readFileSync(postsJsonPath))
const writePost = posts => fs.writeFileSync(postsJsonPath, JSON.stringify(posts))

postsRouter.get("/", (req, res, next) => {
    try {
        const posts = readPosts()
        res.send(posts)
    } catch (error) {
        next(error)
    }
})
postsRouter.post("/", postsValidation, (req, res, next) => {
    try {
        const notValidated = validationResult(req)

        if (!notValidated.isEmpty()) {
            next(createHttpError(400, { notValidated }))
        } else {
            const newPost = { ...req.body, createdAt: new Date(), id: uniqid() }
            const posts = readPosts()

            posts.push(newPost)

            writePost(posts)
            res.status(201).send({ title: newPost.title })
        }
    } catch (error) {
        next(error)
    }
})
postsRouter.get("/:postId", (req, res, next) => {
    try {
        const posts = readPosts()
        const post = posts.find(post => post.id === req.params.postId)
        if (post) {
            res.send(post)
        } else {
            next(createHttpError(404), `Post with id  of ${req.params.postId} is not found`)
        }
    } catch (error) {
        next(error)
    }
})
postsRouter.put("/:postId", (req, res, next) => {
    try {
        const posts = readPosts()
        const index = posts.findIndex(post => post.id === req.params.postId)
        const postToEdit = posts[index]

        const updatedParams = req.body
        const updatedPost = { ...postToEdit, ...updatedParams }

        posts[index] = updatedPost

        writePost(posts)
        res.send(updatedPost)
    } catch (error) {
        next(error)
    }
})
postsRouter.delete("/:postId", (req, res, next) => {
    try {
        const posts = readPosts()
        const deletedPost = posts.filter(post => post.id !== req.params.postId)

        writePost(deletedPost)

        res.status(204).send()

    } catch (error) {
        next(error)
    }
})

export default postsRouter