const normalizeBy = (key) => {
  return (data, item) => {
    data[item[key]] = item;
    data[`${key}s`] = data[`${key}s`]
      ? data[`${key}s`].concat([item[key]])
      : [item[key]];
    return data;
  };
};

export { normalizeBy };
