import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Productsfilter, Productslist } from "../components/products";
import { useProductsContext } from "../context/products-context";
import PRODUCTS_SORT_OPTIONS from "./../constants/products-constants";
import { Dropdown } from "./../ui/";

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
    <StyledWrapper>
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
                Grid
                {/* <BsFillGridFill /> */}
              </button>
              <button
                type="button"
                className={`${isList ? "active" : null}`}
                onClick={toggleViewHandler}
                disabled={isList}
              >
                List
                {/* <BsList /> */}
              </button>
            </div>
            {!isLoading && !error && <p>{productsCount} Products Found</p>}
            <hr />
            <div>
              <label htmlFor="sort">sort by</label>
              <Dropdown
                options={sortingDropdownOptionsArr}
                value={sortingVal}
                onSelectChange={dropdownChangeHandler}
                styleClass={"sort-input"}
              />
            </div>
          </div>
          {isLoading && <div>Loading...</div>}
          {error && <div>Something went wrong!</div>}
          {productsCount > 0 && (
            <Productslist products={filteredProducts} isList={isList} />
          )}
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }

  .search-header {
    display: grid;
    grid-template-columns: auto auto 1fr auto;
    align-items: center;
    margin-bottom: 2rem;
    column-gap: 2rem;
    @media (max-width: 576px) {
      display: grid;
      grid-template-columns: 1fr;
      row-gap: 0.75rem;
      .btn-container {
        width: 50px;
      }
      label {
        display: inline-block;
        margin-right: 0.5rem;
      }
    }
    @media (min-width: 768px) {
      column-gap: 2rem;
    }
    p {
      text-transform: capitalize;
      margin-bottom: 0;
    }

    .btn-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 0.5rem;
      button {
        background: transparent;
        border: 1px solid var(--clr-black);
        color: var(--clr-black);
        width: 1.5rem;
        border-radius: var(--radius);
        height: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        svg {
          font-size: 1rem;
        }
      }
      .active {
        background: var(--clr-black);
        color: var(--clr-white);
      }
    }

    .sort-input {
      border-color: transparent;
      font-size: 1rem;
      text-transform: capitalize;
      padding: 0.25rem 0.5rem;
    }
    label {
      font-size: 1rem;
      text-transform: capitalize;
    }
  }
`;

export default Products;
