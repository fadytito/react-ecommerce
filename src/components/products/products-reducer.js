import {
  FILTER_PRODUCTS,
  LOAD_PRODUCTS,
  UPDATE_FILTERS,
} from "./products-actions";

const productsReducer = (state, action) => {
  const { type, payload } = action;
  const { allProducts } = state;
  switch (type) {
    case LOAD_PRODUCTS:
      return { ...state, allProducts: payload };
    case FILTER_PRODUCTS:
      const { name } = payload;
      let filteredProducts;
      filteredProducts = allProducts.filter((item) => item.name.includes(name));
      return { ...state, filteredProducts };
    case UPDATE_FILTERS:
      return { ...state, filters: payload };
    default:
      return state;
  }
};

export default productsReducer;
