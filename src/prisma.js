import { Prisma } from 'prisma-binding';
const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://192.168.99.100:4466',
});

// first item what we gonna send as parameter
// prisma.query.users(null, '{ id name posts { id title } }').then((data) => {
//   console.log(JSON.stringify(data, null, 2));
// });

// prisma.query.comments(null, '{ id text author {id name}}').then((data) => {
//   console.log(JSON.stringify(data, null, 2));
// });

// prisma.mutation
//   .createPost(
//     {
//       data: {
//         title: 'My new GraphQL post is alive',
//         body: 'You can find it',
//         published: true,
//         author: {
//           connect: {
//             id: 'ckgz23n8n000m0782bqow1pkk',
//           },
//         },
//       },
//     },
//     '{id title body}'
//   )
//   .then((data) => {
//     console.table(data);
//     return prisma.query.users(null, '{id name posts { id title }}');
//   })
//   .then((data) => {
//     console.log(JSON.stringify(data, undefined, 2));
//   });

// prisma.mutation
//   .updatePost(
//     {
//       data: {
//         body: 'There is no body',
//         published: true,
//       },
//       where: {
//         id: 'ckhapzsbm00180782vp2tb3j8',
//       },
//     },
//     '{id title body published}'
//   )
//   .then((data) => {
//     console.table(data);
//     return prisma.query.posts(null, '{id body}');
//   })
//   .then((data) => {
//     console.log(JSON.stringify(data, undefined, 2));
//   });

// const createPostForUser = async (authorId, data) => {
//   const post = await prisma.mutation.createPost(
//     {
//       data: {
//         ...data,
//         author: {
//           connect: {
//             id: authorId,
//           },
//         },
//       },
//     },
//     '{id}'
//   );
//   const user = await prisma.query.user(
//     {
//       where: {
//         id: authorId,
//       },
//     },
//     '{id name email posts {id title published}}'
//   );
//   return user;
// };

// createPostForUser('ckgz23n8n000m0782bqow1pkk', {
//   title: 'Great book to read1',
//   body: 'All about to war!!!1111',
//   published: false,
// }).then((data) => {
//   console.table(JSON.stringify(data, null, 2));
// });

const createPostForUser = async (id, data) => {
  const post = await prisma.mutation.updatePost(
    {
      data: {
        ...data,
      },
      where: {
        id,
      },
    },
    '{author {id}}'
  );
  const posts = await prisma.query.user(
    {
      where: {
        id: post.author.id,
      },
    },
    '{id name email posts {id title published}}'
  );
  return posts;
};

createPostForUser('ckhaqpcns00220782krw17zg2', {
  title: 'Updated Post1',
  body: 'Test body',
}).then((data) => {
  console.log(JSON.stringify(data, null, 2));
});
