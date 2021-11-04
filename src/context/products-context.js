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
  SORT_PRODUCTS,
  UPDATE_FILTERS,
} from "../actions/products-actions";
import config from "../config.json";
import useFetch from "../hooks/useFetch";
import productsReducer from "../reducers/products-reducer";
import omitBy from "../utils/omitBy";

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

  const { allProducts, filters } = products;
  const history = useHistory();
  const { search, pathname } = useLocation();

  const urlFilters = useMemo(() => {
    const urlFiltersObj = qs.parse(search, { ignoreQueryPrefix: true });
    return urlFiltersObj;
  }, [search]);

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
    if (!urlFilters) return;
    dispatchProducts({
      type: UPDATE_FILTERS,
      payload: urlFilters,
    });
  }, [urlFilters]);

  useEffect(() => {
    if (allProducts.length) {
      dispatchProducts({ type: FILTER_PRODUCTS, payload: filters });
    }
  }, [allProducts, filters]);

  const pushSearchQuery = useCallback(
    (query) => {
      const qs = query ? `?${new URLSearchParams(query)}` : "";
      history.push({
        pathname,
        search: qs,
      });
    },
    [history, pathname]
  );

  const filtersChangeHandler = useCallback(
    (filtersQuery) => {
      const { priceRange } = filtersQuery;
      const cleanQuery = omitBy(filtersQuery, null, undefined, "", "all");
      if (priceRange === maxPrice.toString()) delete cleanQuery.priceRange;
      pushSearchQuery(cleanQuery);
    },
    [maxPrice, pushSearchQuery]
  );

  const sortingChangeHandler = useCallback((val) => {
    dispatchProducts({ type: SORT_PRODUCTS, payload: val });
  }, []);

  const clearFiltersHandler = useCallback(() => {
    pushSearchQuery();
  }, [pushSearchQuery]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        minPrice,
        maxPrice,
        isLoading,
        error,
        filtersChangeHandler,
        sortingChangeHandler,
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

