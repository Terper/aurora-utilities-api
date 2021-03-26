import express from "express"
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
import monk, { id } from "monk"

const dbURL = "mongodb://127.0.0.1:27017/aurora"
const db = monk(dbURL)
const users = db.get("users")
const posts = db.get("posts")

class CreatePost {
  uid: string;
  title: string;
  content: string;
  date: string;
  published: boolean;
  constructor(uid:string, {title, content, date, published}: any) {
    this.uid = uid
    this.title = title
    this.content = content
    this.date = date
    this.published = published
  }
}

class Post {
  id: object;
  uid: string;
  title: string;
  content: string;
  date: string;
  published: boolean;
  constructor({_id, uid, title, content, date, published}:any) {
    this.id = id(_id)
    this.uid = uid
    this.title = title
    this.content = content
    this.date = date
    this.published = published
  }
}

class User {
  id: object;
  uid: string;
  posts: boolean;
  contact: boolean;
  constructor({_id, uid, posts, contact}:any) {
    this.id = id(_id)
    this.uid = uid
    this.posts = posts
    this.contact = contact
  }
}

const schema = buildSchema(`
  input UserInput {
    posts: Boolean
    contact: Boolean
  }
  input PostInput {
    title: String
    content: String
    date: String
    published: Boolean
  }
  type User {
    id: ID
    uid: String
    posts: Boolean
    contact: Boolean
  }
  type Post {
    id: ID
    uid: String
    title: String
    content: String
    date: String
    published: Boolean
  }

  type Query {
    getUser(uid: String!): User
    getPosts(uid: String!): [Post]
  }
  type Mutation {
    createUser(uid: String!): User
    modifyUser(uid: String!, input: UserInput): User
    createPost(uid: String!, input: PostInput!): Post

  }
`)

const root = {
  getUser: async ({uid}:any) => {
    const dbRes = await users.findOne({uid: uid}).then((docs: object) => {
      return new User(docs)
    });
    return dbRes
  },
  createUser: async ({uid}:any) => {
    const dbRes = await users.insert({uid: uid, posts: false, contact: false}).then((docs:object) => {
      return new User(docs)
    })
    return dbRes
  },
  modifyUser: async ({uid, input}:any) => {
    const dbRes = await users.findOneAndUpdate({uid: uid}, {$set: {input}}).then((docs:object) => {
      return new User(docs)
    })
    return dbRes
  },
  createPost: async ({uid, input}:any) => {
    if (input.date === "now") {
      input.date = (new Date).toJSON();
    }
    const dbRes = await posts.insert(new CreatePost(uid, input)).then((docs: object) => {
      return new Post(docs)
    })
    return dbRes
  },
  getPosts: async ({uid}:any) => {
    let dbRes = await posts.find({uid: uid}).then((docs) => {
      return docs
    })

    dbRes.sort((a:any, b:any) => {
      return (new Date(b.date)).getTime() - (new Date(a.date)).getTime()
    })

    return dbRes.map((doc) => {
      return new Post(doc)
    })
  }
  
}

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