import express from "express"
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
import monk from "monk"

const dbURL = "mongodb://127.0.0.1:27017/aurora"
const db = monk(dbURL)
const users = db.get("users")
const posts = db.get("posts")

const schema = buildSchema(`
  type Query {
    hello: String
  }
`)

const root = {
  hello: () => {
    return 'Hello world';
  }
}

const app = express()
const port = 4000

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(port, () => {
  console.log(`GraphQL API hosted at http://localhost:${port}`)
})