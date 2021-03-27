import { id } from "monk";

export class CreateUser {
  uid: string;
  posts: boolean;
  contact: boolean;
  constructor(uid: string) {
    this.uid = uid;
    this.posts = false;
    this.contact = false;
  }
}
export class CreatePost {
  uid: string;
  title: string;
  content: string;
  date: string;
  published: boolean;
  constructor(uid: string, { title, content, date, published }: any) {
    this.uid = uid;
    this.title = title;
    this.content = content;
    this.date = date;
    this.published = published;
  }
}
export class Post {
  id: object;
  uid: string;
  title: string;
  content: string;
  date: string;
  published: boolean;
  constructor({ _id, uid, title, content, date, published }: any) {
    this.id = id(_id);
    this.uid = uid;
    this.title = title;
    this.content = content;
    this.date = date;
    this.published = published;
  }
}
export class User {
  id: object;
  uid: string;
  posts: boolean;
  contact: boolean;
  constructor({ _id, uid, posts, contact }: any) {
    this.id = id(_id);
    this.uid = uid;
    this.posts = posts;
    this.contact = contact;
  }
}
