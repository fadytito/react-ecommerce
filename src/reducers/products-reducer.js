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
    let { name, category, company, color, priceRange, shipping } = payload;
    if (!name) name = "";
    if (!category) category = "all";
    if (!company) company = "all";
    if (!color) color = "all";
    if (!shipping) shipping = "all";
    if (!priceRange) priceRange = maxPrice;

    return {
      ...state,
      filters: {
        name,
        category,
        company,
        color,
        shipping,
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
          updatedFilteredProducts = updatedFilteredProducts.filter((item) =>
            item.name.includes(name)
          );
        }
        if (category !== "all") {
          updatedFilteredProducts = updatedFilteredProducts.filter(
            (item) => item.category === category
          );
        }
        if (company !== "all") {
          updatedFilteredProducts = updatedFilteredProducts.filter(
            (item) => item.company === company
          );
        }
        if (color !== "all") {
          updatedFilteredProducts = updatedFilteredProducts.filter((item) =>
            item.colors.includes(color)
          );
        }
        if (shipping !== "all") {
          updatedFilteredProducts = updatedFilteredProducts.filter(
            (item) => item.shipping === Boolean(shipping)
          );
        }
        if (priceRange !== maxPrice) {
          updatedFilteredProducts = updatedFilteredProducts.filter(
            (item) => item.price <= priceRange
          );
        }

        return { ...state, filteredProducts: updatedFilteredProducts };
      case SORT_PRODUCTS:
        let updatedSortedProducts = [...filteredProducts];
        switch (payload) {
          case "0":
            updatedSortedProducts = updatedSortedProducts.sort(
              (a, b) => a.price - b.price
            );
            break;
          case "1":
            updatedSortedProducts = updatedSortedProducts.sort(
              (a, b) => b.price - a.price
            );
            break;
          case "2":
            updatedSortedProducts = updatedSortedProducts.sort((a, b) =>
              a.name.localeCompare(b.name)
            );
            break;
          case "3":
            updatedSortedProducts = updatedSortedProducts
              .sort((a, b) => a.name.localeCompare(b.name))
              .reverse();
            break;
          default:
            return updatedSortedProducts;
        }
        return { ...state, filteredProducts: updatedSortedProducts };
      default:
        return state;
    }
  }
};

export default productsReducer;
