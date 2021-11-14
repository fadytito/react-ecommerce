const normalizeBy = (key) => {
  return (data, item) => {
    data[item[key]] = item;
    return data;
  };
};

const normalizeById = normalizeBy("id");

export { normalizeBy, normalizeById };

