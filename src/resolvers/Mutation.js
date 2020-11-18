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
  async createPost(parent, { data }, { prisma }, info) {
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
  },
  async updatePost(parent, { id, data }, { prisma }, info) {
    return prisma.mutation.updatePost(
      {
        data,
        where: {
          id,
        },
      },
      info
    );
  },
  async deletePost(parent, { id }, { prisma }, info) {
    return prisma.mutation.deletePost(
      {
        where: {
          id,
        },
      },
      info
    );
  },
  async createComment(parent, { data }, { prisma }, info) {
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
  },
  deleteComment(parent, { id }, { prisma }, info) {
    return prisma.mutation.deleteComment(
      {
        where: {
          id,
        },
      },
      info
    );
  },
  updateComment(parent, { id, data }, { prisma }, info) {
    return prisma.mutation.updateComment(
      {
        data,
        where: {
          id,
        },
      },
      info
    );
  },
};
