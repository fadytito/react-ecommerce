import React, { useCallback, useMemo } from "react";
import Productsfilter from "../components/products/ProductsFilter";
import Productslist from "../components/products/ProductsList";
import { useProductsContext } from "../context/filters-context";
import Dropdown from "../ui/Dropdown";
import Toggleview from "../ui/ToggleView";
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

  const selectChangeHandler = useCallback(
    (e) => {
      sortingChangeHandler(e);
    },
    [sortingChangeHandler]
  );

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
          <Toggleview />
          {!isLoading && !error && productsCount}
          <Dropdown
            options={sortingDropdownOptionsArr}
            value={sortingVal}
            defaultValue={"Sort By"}
            onSelectChange={selectChangeHandler}
          />
        </div>
        {isLoading && <div>Loading...</div>}
        {error && <div>Something went wrong!</div>}
        {productsCount > 0 && <Productslist products={filteredProducts} />}
      </div>
    </div>
  );
};

export default Products;
