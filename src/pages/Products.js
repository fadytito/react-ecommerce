import React, { useCallback, useEffect } from "react";
import Productsfilter from "../components/products/ProductsFilter";
import Productslist from "../components/products/ProductsList";
import config from "../config.json";
import useFetch from "../hooks/useFetch";
import ProductModel from "../models/ProductModel";
import Dropdown from "../ui/Dropdown";
import Toggleview from "../ui/ToggleView";
import { normalizeBy } from "../utils/data-normalizer";

const products_api = config.products_api;

const Products = () => {
  const {
    data: products,
    setData: setProducts,
    isLoading,
    error,
    fetchData: fetchProducts,
  } = useFetch({});

  const formatProducts = useCallback(
    (products) => {
      const formattedData = products.map(
        (item) => new ProductModel(item.id, item.name)
      );
      const normalizedData = formattedData.reduce(normalizeBy("id"), {});
      console.log(normalizedData);
      setProducts(normalizedData);
    },
    [setProducts]
  );

  useEffect(() => {
    fetchProducts(products_api, null, formatProducts);
  }, [fetchProducts, formatProducts]);

  return (
    <div>
      <div>
        <Productsfilter />
      </div>
      <div>
        <div>
          <Toggleview />
          products count
          <Dropdown />
        </div>
        <Productslist />
      </div>
    </div>
  );
};

export default Products;
