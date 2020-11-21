import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
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
  async deleteUser(parent, args, { prisma, userId }, info) {
    return prisma.mutation.deleteUser(
      {
        where: {
          id: userId,
        },
      },
      info
    );
  },
  async updateUser(parent, args, { prisma, userId }, info) {
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
};
