import React from "react";
import Productsfilter from "../components/products/ProductsFilter";
import Productslist from "../components/products/ProductsList";
import { useFiltersContext } from "../context/filters-context";
import Dropdown from "../ui/Dropdown";
import Toggleview from "../ui/ToggleView";

const Products = () => {
  const { allProducts, filteredProducts, isLoading, error } =
    useFiltersContext();
  const productsCount = filteredProducts.length;

  const allCategories = [...new Set(allProducts.map((p) => p.category))];
  const allCompanies = [...new Set(allProducts.map((p) => p.company))];
  const allColors = [...new Set(allProducts.map((p) => p.colors).flat())];
  const allPrices = allProducts.map((p) => p.price);
  const minPrice = allPrices.length ? Math.min(...allPrices) : 0;
  const maxPrice = allPrices.length ? Math.max(...allPrices) : 0;

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
