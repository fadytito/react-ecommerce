import qs from "qs";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import { useHistory, useLocation } from "react-router";
import {
  FILTER_PRODUCTS,
  LOAD_PRODUCTS,
  UPDATE_FILTERS,
} from "../components/products/products-actions";
import productsReducer from "../components/products/products-reducer";
import config from "../config.json";
import PRODUCTS_SORT_OPTIONS from "./../components/products/products-constants";
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

  const cleanFilterQueryRef = useRef();

  const { allProducts, filters } = products;
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
    const sortingVal = Object.keys(PRODUCTS_SORT_OPTIONS).find(
      (key) =>
        PRODUCTS_SORT_OPTIONS[key].value.sortingBy === urlFilters.sortingBy &&
        PRODUCTS_SORT_OPTIONS[key].value.sortingDir === urlFilters.sortingDir
    );
    dispatchProducts({
      type: UPDATE_FILTERS,
      payload: { ...urlFilters, sortingVal },
    });
  }, [search]);

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
      cleanFilterQueryRef.current = omitBy(
        filtersQuery,
        null,
        undefined,
        "",
        "all"
      );
      if (priceRange === maxPrice.toString())
        delete cleanFilterQueryRef.current.priceRange;
      delete cleanFilterQueryRef.current.sortingVal;
      pushSearchQuery(cleanFilterQueryRef.current);
    },
    [maxPrice, pushSearchQuery]
  );

  const sortingChangeHandler = useCallback(
    (val) => {
      if (val) {
        const sortingObj = PRODUCTS_SORT_OPTIONS[val].value;
        pushSearchQuery({ ...cleanFilterQueryRef.current, ...sortingObj });
      }
    },
    [pushSearchQuery]
  );

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

