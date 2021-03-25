import express from "express"
import monk from "monk"
import { json } from "body-parser"

const dbURL = "mongodb://127.0.0.1:27017/aurora"
const db = monk(dbURL)
const users = db.get("users")
const posts = db.get("posts")

class User {
  uid: string
  posts: boolean
  contact: boolean
  constructor(UID: string) {
    this.uid = UID
    this.posts = false
    this.contact = false
  }
}

async function doesUserExist(UID:string) {
  const docs = await users.findOne({ uid: UID })
  return docs ? true : false
}
async function createUser(UID:string) {
  const docs = await users.insert(new User(UID))
  console.log(docs)
}
async function getUser(UID:string) {
  const docs = await users.find({ uid: UID})
  return docs
}
async function modifyUser(UID: string, name: string, value: string) {
  const docs = await users.findOneAndUpdate({uid: UID}, {$set: {[name]: value}})
  console.log(docs)
  return docs
}

const app = express()
const port = 4000
app.use(json())


app.post("/user", async (req, res) => {
  if (!await doesUserExist(req.body.UID)) {
    await createUser(req.body.UID)
  }
  res.json(await getUser(req.body.UID))
})
app.post("/userModify", async (req, res) => {
  res.json(await modifyUser(req.body.UID, req.body.name, req.body.value))
})

app.listen(port, () => {
  console.log(`API hosted at http://localhost:${port}`)
})