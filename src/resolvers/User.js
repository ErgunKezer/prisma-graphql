export default {
  posts(parent, args, { db }) {
    const { posts } = db;
    // parent is User object
    return posts.filter((o) => o.author === parent.id);
  },
  comments(parent, args, { db }, info) {
    const { comments } = db;
    return comments.filter((comment) => comment.author === parent.id);
  },
};
