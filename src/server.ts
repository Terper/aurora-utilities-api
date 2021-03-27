import express from "express"
var { graphqlHTTP } = require('express-graphql');
import monk from "monk"
import { root } from "./root";
import { schema } from "./schema";

const dbURL = "mongodb://127.0.0.1:27017/aurora"
const db = monk(dbURL)
export const users = db.get("users")
export const posts = db.get("posts")

const app = express()
const port = 4000

app.use('/', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(port, () => {
  console.log(`GraphQL API hosted at http://localhost:${port}`)
})