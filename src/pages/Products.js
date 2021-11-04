import React, { useCallback, useEffect, useMemo, useState } from "react";
import Productsfilter from "../components/products/ProductsFilter";
import Productslist from "../components/products/ProductsList";
import { useProductsContext } from "../context/filters-context";
import Dropdown from "../ui/Dropdown";
import PRODUCTS_SORT_OPTIONS from "./../components/products/products-constants";

const Products = () => {
  const {
    products: { allProducts, filters, filteredProducts },
    sortingChangeHandler,
    minPrice,
    maxPrice,
    isLoading,
    error,
  } = useProductsContext();
  const [isList, setIsList] = useState(() =>
    JSON.parse(localStorage.getItem("isListView"))
  );

  const productsCount = filteredProducts.length;

  const { sortingVal } = filters;

  const sortingDropdownOptionsArr = useMemo(
    () =>
      Object.keys(PRODUCTS_SORT_OPTIONS).map((key) => ({
        label: PRODUCTS_SORT_OPTIONS[key].label,
        value: key,
      })),
    []
  );

  const allCategories = useMemo(
    () => [...new Set(allProducts.map((p) => p.category))],
    [allProducts]
  );
  const allCompanies = useMemo(
    () => [...new Set(allProducts.map((p) => p.company))],
    [allProducts]
  );
  const allColors = useMemo(
    () => [...new Set(allProducts.map((p) => p.colors).flat())],
    [allProducts]
  );

  const dropdownChangeHandler = useCallback(
    (e) => {
      sortingChangeHandler(e);
    },
    [sortingChangeHandler]
  );

  const toggleViewHandler = () => {
    setIsList((oldState) => !oldState);
  };

  useEffect(() => {
    localStorage.setItem("isListView", isList);
  }, [isList]);

  return (
    <div>
      <div>
        <Productsfilter
          allCategories={allCategories}
          allCompanies={allCompanies}
          allColors={allColors}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <button onClick={toggleViewHandler} disabled={!isList}>
              grid
            </button>
            <button onClick={toggleViewHandler} disabled={isList}>
              list
            </button>
          </div>
          {!isLoading && !error && productsCount}
          <Dropdown
            options={sortingDropdownOptionsArr}
            value={sortingVal}
            onSelectChange={dropdownChangeHandler}
          />
        </div>
        {isLoading && <div>Loading...</div>}
        {error && <div>Something went wrong!</div>}
        {productsCount > 0 && (
          <Productslist products={filteredProducts} isList={isList} />
        )}
      </div>
    </div>
  );
};

export default Products;
