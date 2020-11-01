import { findElementById } from '../util';
export default {
  author(parent, args, { db }, info) {
    const { users } = db;
    return findElementById(parent.author, users);
  },
  post(parent, args, { db }, info) {
    const { posts } = db;
    return findElementById(parent.post, posts);
  },
};
