import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUserId } from '../util';
export default {
  async createUser(parent, args, { prisma }, info) {
    const passwordLen = args.data.password && args.data.password.length > 7;
    if (!passwordLen) {
      throw new Error('Password must be 8 characters or longer');
    }
    const password = await bcrypt.hash(args.data.password, 10);
    const user = await prisma.mutation.createUser({
      data: { ...args.data, password },
    });
    return {
      user,
      token: jwt.sign({ userId: user.id }, 'thisismysecret'),
    };
  },
  async login(parent, { data }, { prisma }, info) {
    const { email, password } = data;
    const user = await prisma.query.user({
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Unable to login');
    }
    return {
      token: jwt.sign({ userId: user.id }, 'thisismysecret'),
      user,
    };
  },
  async deleteUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    return prisma.mutation.deleteUser(
      {
        where: {
          id: userId,
        },
      },
      info
    );
  },
  async updateUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    return prisma.mutation.updateUser(
      {
        where: {
          id: userId,
        },
        data: args.data,
      },
      info
    );
  },
  async createPost(parent, { data }, { prisma, request }, info) {
    const { title, body, published } = data;
    const userId = getUserId(request);
    return prisma.mutation.createPost(
      {
        data: {
          title,
          body,
          published,
          author: {
            connect: {
              id: userId,
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
  async deletePost(parent, { id }, { prisma, request }, info) {
    const userId = getUserId(request);
    const postExists = await prisma.exists.Post({
      id,
      author: {
        id: userId,
      },
    });
    if (!postExists) {
      throw new Error('Unable to delete post');
    }
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
