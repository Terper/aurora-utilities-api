import { buildSchema } from 'graphql'

export const schema = buildSchema(`
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
    modifyPost(id: ID!, input: PostInput): Post
    deletePost(id: ID!): Post

  }
`);
