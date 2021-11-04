const PRODUCTS_SORT_OPTIONS = {
  0: {
    label: "Price (lowest to highes)",
    value: {
      sortingBy: "price",
      sortingDir: "des",
    },
  },
  1: {
    label: "Price (highest to lowest)",
    value: {
      sortingBy: "price",
      sortingDir: "asc",
    },
  },
  2: {
    label: "A to Z",
    value: {
      sortingBy: "az",
      sortingDir: "des",
    },
  },
  3: {
    label: "Z to A",
    value: {
      sortingBy: "az",
      sortingDir: "asc",
    },
  },
};

export default PRODUCTS_SORT_OPTIONS;
