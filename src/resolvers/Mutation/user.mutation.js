import { generateToken, hashPassword } from '@/util';
export default {
  async createUser(parent, args, { prisma }, info) {
    const password = await hashPassword(args.data.password);
    const user = await prisma.mutation.createUser({
      data: { ...args.data, password },
    });
    return {
      user,
      token: generateToken(user.id),
    };
  },
  async deleteUser(parent, args, { prisma, userId }, info) {
    return prisma.mutation.deleteUser(
      {
        where: {
          id: userId,
        },
        data: args.data,
      },
      info
    );
  },
  async updateUser(parent, args, { prisma, userId }, info) {
    if (typeof args.data.password === 'string') {
      args.data.password = await hashPassword(args.data.password);
    }
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
