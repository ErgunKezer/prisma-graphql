export default {
  async createComment(parent, { data }, { prisma, userId }, info) {
    return prisma.mutation.createComment(
      {
        data: {
          text: data.text,
          author: {
            connect: {
              id: userId,
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
  async deleteComment(parent, { id }, { prisma, userId }, info) {
    const isExist = await prisma.exists.Comment({
      id,
      author: {
        id: userId,
      },
    });
    if (!isExist) {
      throw new Error('Unable to delete comment');
    }
    return prisma.mutation.deleteComment(
      {
        where: {
          id,
        },
      },
      info
    );
  },
  async updateComment(parent, { id, data }, { prisma, userId }, info) {
    const isExist = await prisma.exists.Comment({
      id,
      author: {
        id: userId,
      },
    });
    if (!isExist) {
      throw new Error('Unable to update comment');
    }
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
