import { findElementById } from '@/util';

export default {
  author(parent, args, { db }, info) {
    const { users } = db;
    return findElementById(parent.author, users);
  },
  comments(parent, args, { db }, info) {
    const { comments } = db;
    return comments.filter((comment) => comment.post === parent.id);
  },
};
