import React, { useState } from "react";
import {
  Productsfilter,
  Productslist,
  ProductsSearchHeader,
} from "../components/products";
import { useProductsContext } from "../context/products-context";
import Error from "./../components/Error";
import Loading from "./../components/Loading";

const Products = () => {
  const {
    products: { filteredProducts },
    sortingVal,
    isLoading,
    error,
  } = useProductsContext();

  const [isList, setIsList] = useState();

  const productsCount = filteredProducts.length;

  return (
    <div className="section-center products">
      <Productsfilter />
      <div>
        <ProductsSearchHeader
          productsCount={productsCount}
          sortingVal={sortingVal}
          onViewChange={(e) => setIsList(e)}
        />
        {isLoading && <Loading />}
        {error && <Error />}
        {productsCount > 0 && (
          <Productslist products={filteredProducts} isList={isList} />
        )}
        {productsCount === 0 && !isLoading && !error && (
          <h5 style={{ textTransform: "none" }}>
            Sorry, no products matched your search...
          </h5>
        )}
      </div>
    </div>
  );
};

export default Products;
