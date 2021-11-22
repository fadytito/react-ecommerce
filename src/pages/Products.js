import React, { useState } from "react";
import { Error, Loading } from "../components";
import {
  Productsfilter,
  Productslist,
  ProductsSearchHeader,
} from "../components/products";
import { useProductsContext } from "../context/products-context";
import { Breadcrumb } from "../layout";

const Products = () => {
  const [isList, setIsList] = useState();
  const {
    products: { filteredProducts, sortingVal },
    isLoading,
    error,
  } = useProductsContext();

  const productsCount = filteredProducts.length;

  return (
    <React.Fragment>
      <Breadcrumb title="Products" />
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
    </React.Fragment>
  );
};

export default Products;
