import jwt from 'jsonwebtoken';
const findElementById = (id, items) => {
  return items.find((item) => item.id === id);
};
const getUserId = ({ headers }) => {
  const header = headers.authorization;
  if (!header) {
    throw new Error('Authentication required');
  }
  const token = header.replace('Bearer ', '');
  const decoded = jwt.verify(token, 'thisismysecret');
  if (!decoded) {
    throw new Error('Authentication required');
  }
  console.log(decoded);
  return decoded.userId;
};

export { findElementById, getUserId };
