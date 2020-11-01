export default {
  greeting(parent, args, ctx, info) {
    const name = args.name || '';
    const position = args.position || '';
    return `Hello ${name}! You are my favorite ${position}.`;
  },
  grades(parent, args, ctx, info) {
    return [40, 30, null, 20.8]; // 20.3 is converted null cuz it returns integer or null the other types become null
  },
  add(parent, args, ctx, info) {
    return args.number1 + args.number2;
  },
  addWithArrays(parent, args) {
    if (!args.numbers.length) {
      return 0;
    } else {
      return args.numbers.reduce((acc, current) => acc + current);
    }
  },
  me() {
    return {
      id: 'asdasd',
      name: 'Ergun',
      email: 'asdasd',
    };
  },
  post() {
    return {
      id: '1234123',
      title: 'Lotr',
      body: 'War between evil and the others',
      published: true,
    };
  },

  users(parent, args, { db }, info) {
    const { users } = db;
    if (!args.query) {
      return users;
    }
    const containedQuery = args.query.trim();
    return users.filter((user) => {
      return user.name.trim().toLowerCase().includes(containedQuery.toLowerCase());
    });
  },

  posts(parents, args, { db }, info) {
    const { posts } = db;
    if (!args.query) {
      return posts;
    }
    const postQuery = args.query.trim().toLowerCase();
    return posts.filter((post) => post.title.trim().toLowerCase().includes(postQuery));
  },
  comments(parents, args, { db }, info) {
    const { comments } = db;
    if (!args.query) {
      return comments;
    }
    const query = args.query.toLowerCase().trim();
    return comments.filter((comment) => comment.text.toLowerCase().includes(query));
  },
};
