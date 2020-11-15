import { findElementById } from '../util';
import { v4 } from 'uuid';

export default {
  async createUser(parent, args, { prisma }, info) {
    const emailTaken = await prisma.exists.User({ email: args.data.email });
    if (emailTaken) {
      throw new Error('Email taken.');
    }
    return prisma.mutation.createUser({ data: args.data }, info);
  },
  async deleteUser(parent, args, { prisma }, info) {
    const user = await prisma.exists.User({
      id: args.id,
    });
    if (!user) {
      throw new Error('User not found!');
    }
    return prisma.mutation.deleteUser(
      {
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async updateUser(parent, args, { prisma }, info) {
    return prisma.mutation.updateUser(
      {
        where: {
          id: args.id,
        },
        data: args.data,
      },
      info
    );
  },
  async createPost(parent, { data }, { pubSub, prisma }, info) {
    const { title, body, published } = data;
    return prisma.mutation.createPost(
      {
        data: {
          title,
          body,
          published,
          author: {
            connect: {
              id: data.author,
            },
          },
        },
      },
      info
    );

    // if (data.published) {
    //   pubSub.publish(`POST`, {
    //     // this variable has to match with subscription
    //     post: {
    //       mutation: 'CREATED',
    //       data: post,
    //     },
    //   });
    // }
    // return post;
  },
  async updatePost(parent, { id, data }, { pubSub, prisma }, info) {
    return prisma.mutation.updatePost(
      {
        data,
        where: {
          id,
        },
      },
      info
    );
    // const { id, data } = args;
    // const { posts } = db;
    // const post = posts.find((post) => post.id === id);
    // const originalPost = { ...post };
    // if (!post) {
    //   return new Error('Post not found');
    // }
    // if (typeof data.title === 'string') {
    //   post.title = data.title;
    // } else {
    //   new Error('Title has to be string');
    // }
    // if (typeof data.body === 'string') {
    //   post.body = data.body;
    // } else {
    //   new Error('Body has to be string');
    // }
    // if (typeof data.published === 'boolean') {
    //   post.published = data.published;

    //   if (originalPost.published && !post.published) {
    //     // deleted
    //     pubSub.publish('POST', {
    //       post: {
    //         mutation: 'DELETED',
    //         data: originalPost,
    //       },
    //     });
    //   } else if (!originalPost.published && post.published) {
    //     // created
    //     pubSub.publish('POST', {
    //       post: {
    //         mutation: 'CREATED',
    //         data: post,
    //       },
    //     });
    //   } else if (post.published) {
    //     // updated
    //     pubSub.publish('POST', {
    //       post: {
    //         mutation: 'UPDATED',
    //         data: post,
    //       },
    //     });
    //   }
    // } else {
    //   new Error('Published has to be boolean');
    // }
    // return post;
  },
  async deletePost(parent, { id }, { pubSub, prisma }, info) {
    return prisma.mutation.deletePost(
      {
        where: {
          id,
        },
      },
      info
    );

    // const { posts, setNewComment, comments } = db;
    // const postIndex = posts.findIndex((post) => post.id === args.id);
    // if (postIndex === -1) {
    //   throw new Error('Post not found');
    // }
    // // array destruction
    // const [deletedPost] = posts.splice(postIndex, 1);
    // if (deletedPost.published) {
    //   pubSub.publish('POST', {
    //     post: {
    //       mutation: 'DELETED',
    //       data: deletedPost[0],
    //     },
    //   });
    // }
    // const newComments = comments.filter((comment) => comment.post !== args.id);
    // setNewComment(newComments);
    // return deletedPost;
  },
  async createComment(parent, { data }, { db, pubSub, prisma }, info) {
    return prisma.mutation.createComment(
      {
        data: {
          text: data.text,
          author: {
            connect: {
              id: data.author,
            },
          },
          post: {
            connect: {
              id: data.post,
            },
          },
        },
      },
      info
    );
    // const { author, post } = args.data;
    // const { posts, users, comments } = db;
    // const authorExist = findElementById(author, users),
    //   postExist = findElementById(post, posts);
    // if (!authorExist || !postExist) {
    //   throw new Error('Post or author does not exist');
    // }
    // const comment = {
    //   id: v4(),
    //   ...args.data,
    // };
    // comments.push(comment);
    // pubSub.publish(`COMMENT`, {
    //   comment: {
    //     mutation: 'CREATED',
    //     data: comment,
    //   },
    // });
    // return comment;
  },
  deleteComment(parent, { id }, { db, pubSub, prisma }, info) {
    return prisma.mutation.deleteComment(
      {
        where: {
          id,
        },
      },
      info
    );
    // const { comments } = db;
    // const commentIndex = comments.findIndex((comment) => comment.id === args.id);
    // if (commentIndex === -1) {
    //   throw new Error('Comment not found!');
    // }
    // const [deletedComment] = comments.splice(commentIndex, 1);
    // pubSub.publish('COMMENT', {
    //   comment: {
    //     mutation: 'DELETED',
    //     data: deletedComment,
    //   },
    // });
    // return deletedComment;
  },
  updateComment(parent, { id, data }, { db, pubSub, prisma }, info) {
    return prisma.updateComment(
      {
        data,
        where: {
          id,
        },
      },
      info
    );
    // const { id, data } = args;
    // const { comments } = db;
    // const comment = comments.find((comment) => comment.id === id);
    // if (!comment) {
    //   throw new Error('Comment not found');
    // }
    // if (typeof data.text === 'string') {
    //   comment.text = data.text;
    // } else {
    //   throw new Error('Text has to be string');
    // }
    // pubSub.publish('COMMENT', {
    //   comment: {
    //     mutation: 'UPDATED',
    //     data: comment,
    //   },
    // });
    // return comment;
  },
};
