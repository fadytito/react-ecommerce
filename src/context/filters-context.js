import qs from "qs";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { useHistory, useLocation } from "react-router";
import {
  FILTER_PRODUCTS,
  LOAD_PRODUCTS,
  UPDATE_FILTERS,
} from "../components/products/products-actions";
import productsReducer from "../components/products/products-reducer";
import config from "../config.json";
import useFetch from "./../hooks/useFetch";
import omitBy from "./../utils/omitBy";

const productsInitialValues = {
  allProducts: [],
  filteredProducts: [],
  filters: {
    name: "",
    category: "all",
    company: "all",
    color: "all",
  },
};

const ProductsContext = React.createContext(productsInitialValues);

const products_api = config.products_api;

const ProductsProvider = ({ children }) => {
  const { isLoading, error, fetchData: fetchProducts } = useFetch();
  const [products, dispatchProducts] = useReducer(
    productsReducer,
    productsInitialValues
  );

  const { allProducts, filteredProducts, filters } = products;
  const { search, pathname } = useLocation();
  const history = useHistory();

  const allPrices = useMemo(
    () => allProducts.map((p) => p.price),
    [allProducts]
  );
  const minPrice = useMemo(
    () => (allPrices.length ? Math.min(...allPrices) : 0),
    [allPrices]
  );
  const maxPrice = useMemo(
    () => (allPrices.length ? Math.max(...allPrices) : 0),
    [allPrices]
  );

  const loadProducts = useCallback((products) => {
    dispatchProducts({ type: LOAD_PRODUCTS, payload: products });
  }, []);

  useEffect(() => {
    fetchProducts(products_api, null, loadProducts);
  }, [fetchProducts, loadProducts]);

  useEffect(() => {
    const urlFilters = search
      ? qs.parse(search, { ignoreQueryPrefix: true })
      : productsInitialValues.filters;
    dispatchProducts({ type: UPDATE_FILTERS, payload: urlFilters });
  }, [search]);

  useEffect(() => {
    if (allProducts.length) {
      dispatchProducts({ type: FILTER_PRODUCTS, payload: filters });
    }
  }, [allProducts, filters]);

  const filtersChangeHandler = useCallback(
    (filtersQuery) => {
      const cleanQuery = omitBy(
        filtersQuery,
        null,
        undefined,
        "",
        "all",
        maxPrice.toString()
      );
      const qs = `?${new URLSearchParams(cleanQuery)}`;
      history.push({
        pathname,
        search: qs,
      });
    },
    [maxPrice, history]
  );

  const clearFiltersHandler = useCallback(() => {
    history.push({
      pathname,
      search: "",
    });
  }, [history]);

  return (
    <ProductsContext.Provider
      value={{
        allProducts,
        filteredProducts,
        isLoading,
        error,
        filters,
        minPrice,
        maxPrice,
        filtersChangeHandler,
        clearFiltersHandler,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

const useProductsContext = () => {
  return useContext(ProductsContext);
};

export { ProductsProvider, useProductsContext };

