import { User, CreateUser, CreatePost, Post } from "./classes";
import { users, posts } from "./server";

export const root = {
  getUser: async ({ uid }: any) => {
    const dbRes = await users.findOne({ uid: uid }).then((docs: object) => {
      return new User(docs);
    });
    return dbRes;
  },
  createUser: async ({ uid }: any) => {
    const dbRes = await users.insert(new CreateUser(uid)).then((docs: object) => {
      return new User(docs);
    });
    return dbRes;
  },
  modifyUser: async ({ uid, input }: any) => {
    const dbRes = await users.findOneAndUpdate({ uid: uid }, { $set: { input } }).then((docs: object) => {
      return new User(docs);
    });
    return dbRes;
  },
  createPost: async ({ uid, input }: any) => {
    if (input.date === "now") {
      input.date = (new Date).toJSON();
    }
    const dbRes = await posts.insert(new CreatePost(uid, input)).then((docs: object) => {
      return new Post(docs);
    });
    return dbRes;
  },
  deletePost: async ({ id }: any) => {
    const dbRes = await posts.findOneAndDelete({ _id: id }).then((docs) => {
      return new Post(docs);
    });
    return dbRes;
  },
  modifyPost: async ({ id, input }: any) => {
    const dbRes = await posts.findOneAndUpdate({ _id: id }, { $set: { input } }).then((docs) => {
      return new Post(docs);
    });
    return dbRes;
  },
  getPosts: async ({ uid }: any) => {
    const dbRes = await posts.find({ uid: uid }).then((docs) => {
      return docs;
    });

    dbRes.sort((a: any, b: any) => {
      return (new Date(b.date)).getTime() - (new Date(a.date)).getTime();
    });

    return dbRes.map((doc) => {
      return new Post(doc);
    });
  }
};
