import {
  FILTER_PRODUCTS,
  LOAD_PRODUCTS,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
} from "../actions/products-actions";

const productsReducer = (state, action) => {
  const { type, payload } = action;
  const { allProducts, filteredProducts, maxPrice } = state;

  if (type === UPDATE_FILTERS) {
    let { name, category, company, color, priceRange } = payload;
    if (!name) name = "";
    if (!category) category = "all";
    if (!company) company = "all";
    if (!color) color = "all";
    if (!priceRange) priceRange = maxPrice;

    return {
      ...state,
      filters: {
        ...payload,
        name,
        category,
        company,
        color,
        priceRange,
      },
    };
  } else {
    switch (type) {
      case LOAD_PRODUCTS:
        return { ...state, allProducts: payload, filteredProducts: payload };
      case FILTER_PRODUCTS:
        const { name, category, company, color, priceRange, shipping } =
          payload;
        let updatedFilteredProducts = [...allProducts];
        if (name) {
          updatedFilteredProducts = filteredProducts.filter((item) =>
            item.name.includes(name)
          );
        }
        if (category && category !== "all") {
          updatedFilteredProducts = filteredProducts.filter(
            (item) => item.category === category
          );
        }
        if (company && company !== "all") {
          updatedFilteredProducts = filteredProducts.filter(
            (item) => item.company === company
          );
        }
        if (color && color !== "all") {
          updatedFilteredProducts = filteredProducts.filter((item) =>
            item.colors.indexOf(color)
          );
        }
        if (priceRange) {
          updatedFilteredProducts = filteredProducts.filter(
            (item) => item.price <= priceRange
          );
        }
        if (shipping) {
          updatedFilteredProducts = filteredProducts.filter(
            (item) => item.shipping === Boolean(shipping)
          );
        }

        return { ...state, filteredProducts: updatedFilteredProducts };
      case SORT_PRODUCTS:
        let updatedSortedProducts = [...filteredProducts];
        switch (payload) {
          case "0":
            updatedSortedProducts = filteredProducts.sort(
              (a, b) => a.price - b.price
            );
            break;
          case "1":
            updatedSortedProducts = filteredProducts.sort(
              (a, b) => b.price - a.price
            );
            break;
          case "2":
            updatedSortedProducts = filteredProducts.sort((a, b) =>
              a.name.localeCompare(b.name)
            );
            break;
          case "3":
            updatedSortedProducts = filteredProducts
              .sort((a, b) => a.name.localeCompare(b.name))
              .reverse();
            break;
          default:
            return filteredProducts;
        }
        return { ...state, filteredProducts: updatedSortedProducts };
      default:
        return state;
    }
  }
};

export default productsReducer;
