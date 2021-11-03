import {
  FILTER_PRODUCTS,
  LOAD_PRODUCTS,
  UPDATE_FILTERS,
} from "./products-actions";

const productsReducer = (state, action) => {
  const { type, payload } = action;
  const { allProducts, maxPrice } = state;
  if (type === UPDATE_FILTERS) {
    let { name, category, company, color, priceRange } = payload;
    if (!name) name = "";
    if (!category) category = "all";
    if (!company) company = "all";
    if (!color) color = "all";
    if (!priceRange) priceRange = maxPrice;
    return {
      ...state,
      filters: { ...payload, name, category, company, color, priceRange },
    };
  } else {
    switch (type) {
      case LOAD_PRODUCTS:
        return { ...state, allProducts: payload };
      case FILTER_PRODUCTS:
        const { name, category, company, color, priceRange, shipping } =
          payload;
        let filteredProducts = allProducts;
        if (name) {
          filteredProducts = filteredProducts.filter((item) =>
            item.name.includes(name)
          );
        }
        if (category && category !== "all") {
          filteredProducts = filteredProducts.filter(
            (item) => item.category === category
          );
        }
        if (company && company !== "all") {
          filteredProducts = filteredProducts.filter(
            (item) => item.company === company
          );
        }
        if (color && color !== "all") {
          filteredProducts = filteredProducts.filter((item) =>
            item.colors.indexOf(color)
          );
        }
        if (priceRange) {
          filteredProducts = filteredProducts.filter(
            (item) => item.price <= priceRange
          );
        }
        if (shipping) {
          filteredProducts = filteredProducts.filter(
            (item) => item.shipping === Boolean(shipping)
          );
        }
        return { ...state, filteredProducts };
      case UPDATE_FILTERS:
        return {
          ...state,
          filters: { ...payload, name, category, company, color },
        };
      default:
        return state;
    }
  }
};

export default productsReducer;
