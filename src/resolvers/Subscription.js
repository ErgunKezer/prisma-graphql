const Subscription = {
  count: {
    subscribe(parent, args, { pubSub }, info) {
      let count = 0;
      setInterval(() => {
        count += 1;
        pubSub.publish('count', {
          count,
        });
      }, 1000);
      return pubSub.asyncIterator('count');
    },
  },
  comment: {
    subscribe(parent, { postId }, { db, pubSub }, info) {
      // const post = db.posts.find((post) => post.id === postId && post.published);
      // if (!post) {
      //   throw new Error('Post not found');
      // }
      // return pubSub.asyncIterator(`COMMENT_${postId}`);
      return pubSub.asyncIterator(`COMMENT`);
    },
  },
  post: {
    subscribe(parent, args, { pubSub }, info) {
      return pubSub.asyncIterator(`POST`);
    },
  },
};

export default Subscription;
