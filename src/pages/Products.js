import React from "react";
import Productsfilter from "../components/products/ProductsFilter";
import Productslist from "../components/products/ProductsList";
import { useFiltersContext } from "../context/filters-context";
import Dropdown from "../ui/Dropdown";
import Toggleview from "../ui/ToggleView";

const Products = () => {
  const { filteredProducts, isLoading, error } = useFiltersContext();
  const productsCount = filteredProducts?.length;

  return (
    <div>
      <div>
        <Productsfilter />
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
