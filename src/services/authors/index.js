import express from "express"
import fs, { readFileSync } from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import uniqid from "uniqid"

const authorsRouter = express.Router()

const currentDirPath = dirname(fileURLToPath(import.meta.url))
const authorsJsonPath = join(currentDirPath, "authors.json")

authorsRouter.get("/", (req, res) => {
    const authors = JSON.parse(fs.readFileSync(authorsJsonPath).toString())
    res.send(authors)

})
authorsRouter.post("/", (req, res) => {
    const { name, surname, email, dateOfBirth } = req.body
    const authors = JSON.parse(fs.readFileSync(authorsJsonPath).toString())
    const newAuthor = {
        id: uniqid(),
        name,
        surname,
        email,
        dateOfBirth,
        createdAt: new Date(),
    }
    authors.push(newAuthor)
    fs.writeFileSync(authorsJsonPath, JSON.stringify(authors))

    res.status(201).send({ id: newAuthor.id })
})
authorsRouter.post("/checkEmail", (req, res) => {
    const { name, surname, email, dateOfBirth } = req.body
    const newAuthor = {
        id: uniqid(),
        name,
        surname,
        email,
        dateOfBirth,
        createdAt: new Date(),
    }
    const authors = JSON.parse(fs.readFileSync(authorsFilePath).toString())
    const emailIsThere = authors.some(
        author => author.email === req.body.email)
    if (emailIsThere) {
        res.send(`Sorry the email is already in use ${false}`)
    } else {
        authors.push(newAuthor)
        fs.writeFileSync(authorsJsonPath, JSON.stringify(authors))
        return res.send(true)
    }
})
authorsRouter.get("/:authorId", (req, res) => {
    const authors = JSON.parse(fs.readFileSync(authorsJsonPath).toString())

    const author = authors.find(author => author.id === req.params.authorId)
    res.send(author)
})
authorsRouter.put("/:authorId", (req, res) => {
    const authors = JSON.parse(fs.readFileSync(authorsJsonPath).toString())
    const indexOfAuthor = authors.findIndex(author => author.id === req.params.authorId)
    const updatedAuthor = { ...authors[indexOfAuthor], ...req.body }

    authors[indexOfAuthor] = updatedAuthor

    fs.writeFileSync(authorsJsonPath, JSON.stringify(authors))

    res.send(updatedAuthor)
})
authorsRouter.delete("/:authorId", (req, res) => {
    const authors = JSON.parse(fs.readFileSync(authorsJsonPath).toString())
    const filteredAuthors = authors.filter(author => author.id !== req.params.authorId)
    fs.writeFileSync(authorsJsonPath, JSON.stringify(filteredAuthors))

    res.status(204).send()

})

export default authorsRouter