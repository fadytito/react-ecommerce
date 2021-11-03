import qs from "qs";
import React, { useCallback, useContext, useEffect, useReducer } from "react";
import { useHistory, useLocation } from "react-router";
import {
  FILTER_PRODUCTS,
  LOAD_PRODUCTS,
  UPDATE_FILTERS,
} from "../components/products/products-actions";
import productsReducer from "../components/products/products-reducer";
import config from "../config.json";
import useFetch from "./../hooks/useFetch";

const FiltersContext = React.createContext();

const products_api = config.products_api;

const FiltersProvider = ({ children }) => {
  const { isLoading, error, fetchData: fetchProducts } = useFetch();
  const [products, dispatchProducts] = useReducer(productsReducer, {
    allProducts: [],
    filteredProducts: [],
    filters: { name: "" },
  });

  const { allProducts, filteredProducts, filters } = products;
  const { search, pathname } = useLocation();
  const history = useHistory();

  const loadProducts = useCallback((products) => {
    dispatchProducts({ type: LOAD_PRODUCTS, payload: products });
  }, []);

  useEffect(() => {
    fetchProducts(products_api, null, loadProducts);
  }, [fetchProducts, loadProducts]);

  useEffect(() => {
    if (search) {
      const urlFilters = qs.parse(search, { ignoreQueryPrefix: true });
      dispatchProducts({ type: UPDATE_FILTERS, payload: urlFilters });
    }
  }, [search]);

  useEffect(() => {
    if (allProducts.length) {
      dispatchProducts({ type: FILTER_PRODUCTS, payload: filters });
    }
  }, [allProducts, filters]);

  const filtersChangeHandler = (filtersQuery) => {
    const qs = `?${new URLSearchParams(filtersQuery)}`;
    history.push({
      pathname,
      search: qs,
    });
  };

  return (
    <FiltersContext.Provider
      value={{
        filteredProducts,
        isLoading,
        error,
        filters,
        filtersChangeHandler,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

const useFiltersContext = () => {
  return useContext(FiltersContext);
};

export { FiltersProvider, useFiltersContext };
