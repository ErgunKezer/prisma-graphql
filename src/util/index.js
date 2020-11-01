const findElementById = (id, items) => {
  return items.find((item) => item.id === id);
};

export { findElementById };
