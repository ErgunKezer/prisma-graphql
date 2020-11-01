// demo user data
let users = [
  {
    id: '1',
    name: 'Ergun',
    email: 'ergun@example.com',
  },
  {
    id: '2',
    name: 'Umit',
    email: 'umit@example.com',
  },
  {
    id: '3',
    name: 'Ozge',
    email: 'ozge@example.com',
  },
  {
    id: '4',
    name: 'Ela',
    email: 'ela@example.com',
    age: 8,
  },
];

let posts = [
  {
    id: '1',
    title: 'Turkey',
    body: 'Total emotional rollercoaster',
    published: true,
    author: '1',
  },
  {
    id: '2',
    title: 'Iran',
    body: 'Hidden hell',
    published: false,
    author: '3',
  },
  {
    id: '3',
    title: 'Syria',
    body: 'War',
    published: true,
    author: '4',
  },
];
let comments = [
  {
    id: '1',
    text: 'First Comment',
    author: '1',
    post: '1',
  },
  {
    id: '2',
    text: 'Second Comment',
    author: '3',
    post: '3',
  },
  {
    id: '3',
    text: 'Third Comment',
    author: '1',
    post: '1',
  },
  {
    id: '4',
    text: 'Forth Comment',
    author: '2',
    post: '2',
  },
];

const setNewComment = (newComments) => {
  comments = newComments;
};

const setNewPosts = (newPosts) => {
  posts = newPosts;
};
export { comments, posts, users, setNewComment, setNewPosts };
