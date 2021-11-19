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
import useFetch from "../hooks/useFetch";
import productsReducer from "../reducers/products-reducer";
import { normalizeById } from "../utils/data-normalizer";
import omitBy from "../utils/omitBy";

const productsInitialValues = {
  allProducts: {},
  filteredProducts: [],
  filters: {
    name: "",
    category: "all",
    company: "all",
    color: "all",
  },
  sortingVal: "2",
};

const ProductsContext = React.createContext(productsInitialValues);

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

  const allProductsArr = Object.keys(allProducts).map((id) => allProducts[id]);

  const allPrices = useMemo(
    () => allProductsArr.map((p) => p.price),
    [allProductsArr]
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
    const normalizedProducts = products.reduce(
      (products, product) => normalizeById(products, product),
      {}
    );
    dispatchProducts({ type: LOAD_PRODUCTS, payload: normalizedProducts });
  }, []);

  useEffect(() => {
    fetchProducts(null, loadProducts);
  }, [fetchProducts, loadProducts]);

  useEffect(() => {
    if (!urlFilters) return;
    dispatchProducts({
      type: UPDATE_FILTERS,
      payload: urlFilters,
    });
  }, [urlFilters]);

  useEffect(() => {
    if (allProductsArr.length) {
      dispatchProducts({ type: FILTER_PRODUCTS, payload: filters });
    }
  }, [allProductsArr.length, filters]);

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
        allProductsArr,
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

