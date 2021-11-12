import React, { useEffect, useMemo, useState } from "react";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { Productsfilter, Productslist } from "../components/products";
import { useProductsContext } from "../context/products-context";
import Error from "./../components/Error";
import Loading from "./../components/Loading";
import PRODUCTS_SORT_OPTIONS from "./../constants/products-constants";

const Products = () => {
  const {
    products: { allProducts, filteredProducts, sortingVal },
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

  const sortChangeHandler = (e) => {
    sortingChangeHandler(e.target.value);
  };

  const toggleViewHandler = () => {
    setIsList((oldState) => !oldState);
  };

  useEffect(() => {
    localStorage.setItem("isListView", isList);
  }, [isList]);

  return (
    <div className="section-center products">
      <Productsfilter
        allCategories={allCategories}
        allCompanies={allCompanies}
        allColors={allColors}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />
      <div>
        <div className="search-header">
          <div className="btn-container">
            <button
              type="button"
              className={`${!isList ? "active" : null}`}
              onClick={toggleViewHandler}
              disabled={!isList}
            >
              <BsFillGridFill />
            </button>
            <button
              type="button"
              className={`${isList ? "active" : null}`}
              onClick={toggleViewHandler}
              disabled={isList}
            >
              <BsList />
            </button>
          </div>
          <p>{productsCount} Products Found</p>
          <hr />
          <div>
            <label htmlFor="sort">sort by</label>
            <select
              value={sortingVal}
              onChange={sortChangeHandler}
              className="sort-input"
            >
              {sortingDropdownOptionsArr.map((option) => (
                <option value={option.value} key={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
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
