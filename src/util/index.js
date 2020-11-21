import jwt from 'jsonwebtoken';
const findElementById = (id, items) => {
  return items.find((item) => item.id === id);
};
const getUserId = ({ headers }, requireAuth = true) => {
  const header = headers.authorization;
  if (header) {
    const token = header.replace('Bearer ', '');
    const decoded = jwt.verify(token, 'thisismysecret');
    if (!decoded) {
      throw new Error('Authentication required');
    }
    return decoded.userId;
  }
  if (requireAuth) {
    throw new Error('Authentication required');
  }
  return null;
};

const generateError = (error) => {
  return new Error(error);
};
export { findElementById, getUserId, generateError };
