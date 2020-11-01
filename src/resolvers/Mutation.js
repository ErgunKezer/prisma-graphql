import { findElementById } from '../util';
import { v4 } from 'uuid';

export default {
  createUser(parent, args, { db }, info) {
    const { data } = args;
    const { users } = db;
    const emailTaken = users.find(({ email }) => email === data.email);
    if (emailTaken) {
      throw new Error('Email taken.');
    }
    const user = {
      id: v4(),
      ...data,
    };
    users.push(user);
    return user;
  },
  deleteUser(parent, args, { db }, info) {
    const { users, setNewComment, setNewPosts, posts, comments } = db;
    const userIndex = users.findIndex((user) => user.id === args.id);
    if (userIndex === -1) {
      throw new Error('User not found!');
    }
    const deletedUser = users.splice(userIndex, 1);

    const newPosts = posts.filter((post) => post.author !== args.id);
    setNewPosts(newPosts);

    const newComments = comments.filter((comment) => comment.author !== args.id);
    setNewComment(newComments);

    return deletedUser[0];
  },
  updateUser(parent, args, { db }, info) {
    const { id, data } = args;
    const { users } = db;
    const user = users.find((user) => user.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    if (typeof data.email === 'string') {
      const emailTaken = users.find((user) => user.email === data.email);
      if (emailTaken) {
        throw new Error('Email is taken');
      }
      user.email = data.email;
    } else {
      throw new Error('Email has to be string');
    }
    if (typeof data.name === 'string') {
      user.name = data.name;
    } else {
      throw new Error('Name has to be string');
    }
    if (typeof data.age !== 'undefined') {
      user.age = data.age;
    }
    return user;
  },
  createPost(parent, { data }, { db, pubSub }, info) {
    const { posts, users } = db;
    const userExist = users.find((user) => user.id == data.author);
    if (!userExist) {
      throw new Error('User does not exist');
    }
    const post = {
      id: v4(),
      ...data,
    };
    posts.push(post);
    if (data.published) {
      pubSub.publish(`POST`, {
        // this variable has to match with subscription
        post: {
          mutation: 'CREATED',
          data: post,
        },
      });
    }
    return post;
  },
  updatePost(parent, args, { db, pubSub }, info) {
    const { id, data } = args;
    const { posts } = db;
    const post = posts.find((post) => post.id === id);
    const originalPost = { ...post };
    if (!post) {
      return new Error('Post not found');
    }
    if (typeof data.title === 'string') {
      post.title = data.title;
    } else {
      new Error('Title has to be string');
    }
    if (typeof data.body === 'string') {
      post.body = data.body;
    } else {
      new Error('Body has to be string');
    }
    if (typeof data.published === 'boolean') {
      post.published = data.published;

      if (originalPost.published && !post.published) {
        // deleted
        pubSub.publish('POST', {
          post: {
            mutation: 'DELETED',
            data: originalPost,
          },
        });
      } else if (!originalPost.published && post.published) {
        // created
        pubSub.publish('POST', {
          post: {
            mutation: 'CREATED',
            data: post,
          },
        });
      } else if (post.published) {
        // updated
        pubSub.publish('POST', {
          post: {
            mutation: 'UPDATED',
            data: post,
          },
        });
      }
    } else {
      new Error('Published has to be boolean');
    }
    return post;
  },
  deletePost(parent, args, { db, pubSub }, info) {
    const { posts, setNewComment, comments } = db;
    const postIndex = posts.findIndex((post) => post.id === args.id);
    if (postIndex === -1) {
      throw new Error('Post not found');
    }
    // array destruction
    const [deletedPost] = posts.splice(postIndex, 1);
    if (deletedPost.published) {
      pubSub.publish('POST', {
        post: {
          mutation: 'DELETED',
          data: deletedPost[0],
        },
      });
    }
    const newComments = comments.filter((comment) => comment.post !== args.id);
    setNewComment(newComments);
    return deletedPost;
  },
  createComment(parent, args, { db, pubSub }, info) {
    const { author, post } = args.data;
    const { posts, users, comments } = db;
    const authorExist = findElementById(author, users),
      postExist = findElementById(post, posts);
    if (!authorExist || !postExist) {
      throw new Error('Post or author does not exist');
    }
    const comment = {
      id: v4(),
      ...args.data,
    };
    comments.push(comment);
    pubSub.publish(`COMMENT`, {
      comment: {
        mutation: 'CREATED',
        data: comment,
      },
    });
    return comment;
  },
  deleteComment(parent, args, { db, pubSub }, info) {
    const { comments } = db;
    const commentIndex = comments.findIndex((comment) => comment.id === args.id);
    if (commentIndex === -1) {
      throw new Error('Comment not found!');
    }
    const [deletedComment] = comments.splice(commentIndex, 1);
    pubSub.publish('COMMENT', {
      comment: {
        mutation: 'DELETED',
        data: deletedComment,
      },
    });
    return deletedComment;
  },
  updateComment(parent, args, { db, pubSub }, info) {
    const { id, data } = args;
    const { comments } = db;
    const comment = comments.find((comment) => comment.id === id);
    if (!comment) {
      throw new Error('Comment not found');
    }
    if (typeof data.text === 'string') {
      comment.text = data.text;
    } else {
      throw new Error('Text has to be string');
    }
    pubSub.publish('COMMENT', {
      comment: {
        mutation: 'UPDATED',
        data: comment,
      },
    });
    return comment;
  },
};
