import React, { useMemo } from "react";
import Productsfilter from "../components/products/ProductsFilter";
import Productslist from "../components/products/ProductsList";
import { useProductsContext } from "../context/filters-context";
import Dropdown from "../ui/Dropdown";
import Toggleview from "../ui/ToggleView";

const Products = () => {
  const {
    allProducts,
    filteredProducts,
    minPrice,
    maxPrice,
    isLoading,
    error,
  } = useProductsContext();
  const productsCount = filteredProducts.length;

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
        <div>
          <Toggleview />
          {!isLoading && !error && productsCount}
          <Dropdown />
        </div>
        {isLoading && <div>Loading...</div>}
        {error && <div>Something went wrong!</div>}
        {productsCount > 0 && <Productslist products={filteredProducts} />}
      </div>
    </div>
  );
};

export default Products;
