import React, { useEffect, useMemo, useRef, useState } from "react";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useProductsContext } from "../../context/products-context";
import PRODUCTS_SORT_OPTIONS from "./../../constants/products-constants";

const ProductsSearchHeader = ({ productsCount, sortingVal, onViewChange }) => {
  const [isList, setIsList] = useState(() =>
    JSON.parse(localStorage.getItem("isListView"))
  );
  const { sortingChangeHandler } = useProductsContext();
  const onViewChangeRef = useRef();
  onViewChangeRef.current = onViewChange;

  const sortingDropdownOptionsArr = useMemo(
    () =>
      Object.keys(PRODUCTS_SORT_OPTIONS).map((key) => ({
        label: PRODUCTS_SORT_OPTIONS[key].label,
        value: key,
      })),
    []
  );

  const sortChangeHandler = (e) => {
    sortingChangeHandler(e.target.value);
  };

  const toggleViewHandler = () => {
    setIsList((oldState) => !oldState);
  };

  useEffect(() => {
    localStorage.setItem("isListView", isList);
    onViewChangeRef.current(isList);
  }, [isList]);

  return (
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
  );
};

export default ProductsSearchHeader;
