export default {
  async createPost(parent, { data }, { prisma, userId }, info) {
    const { title, body, published } = data;
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
  async updatePost(parent, { id, data }, { prisma, userId }, info) {
    const [post] = await prisma.query.posts({
      where: {
        id,
        author: {
          id: userId,
        },
      },
    });
    if (!post) {
      throw new Error('Unable to update post');
    }
    if (post.published && !data.published) {
      await prisma.mutation.deleteManyComments({
        where: {
          post: {
            id,
          },
        },
      });
    }
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
  async deletePost(parent, { id }, { prisma, userId }, info) {
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
};
