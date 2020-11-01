import { Prisma } from 'prisma-binding';
const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://192.168.99.100:4466',
});

// first item what we gonna send as parameter
// prisma.query.users(null, '{ id name posts { id title } }').then((data) => {
//   console.log(JSON.stringify(data, null, 2));
// });

prisma.query.comments(null, '{ id text author {id name}}').then((data) => {
  console.log(JSON.stringify(data, null, 2));
});
