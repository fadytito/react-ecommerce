import React, { useMemo } from "react";
import { FaCheck } from "react-icons/fa";
import { useProductsContext } from "../../context/products-context";
import formatPrice from "./../../utils/format-price";

const Productsfilter = () => {
  const {
    products: { filters },
    allProductsArr,
    minPrice,
    maxPrice,
    filtersChangeHandler,
    clearFiltersHandler,
  } = useProductsContext();

  const { name, category, company, color, priceRange, shipping } = filters;

  const allCategories = useMemo(
    () => [...new Set(allProductsArr.map((p) => p.category))],
    [allProductsArr]
  );
  const allCompanies = useMemo(
    () => [...new Set(allProductsArr.map((p) => p.company))],
    [allProductsArr]
  );
  const allColors = useMemo(
    () => [...new Set(allProductsArr.map((p) => p.colors).flat())],
    [allProductsArr]
  );

  const priceRangeValue = priceRange ? priceRange : maxPrice;

  const inputChangeHandler = (e) => {
    const { name, value, checked } = e.target;

    const updatedFilters = {
      ...filters,
      [name]: value,
      shipping:
        name === "shipping" ? (!checked ? "all" : "free") : filters.shipping,
    };
    filtersChangeHandler(updatedFilters);
  };

  return (
    <section className="filters">
      <div className="content">
        <div className="form-control">
          <input
            name="name"
            type="text"
            className="search-input"
            placeholder="Search"
            value={name}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="form-control">
          <h5>category</h5>
          <div>
            <input
              type="radio"
              name="category"
              id="allCategories"
              value="all"
              checked={category === "all" || !category}
              onChange={inputChangeHandler}
            />
            <label htmlFor="allCategories">all</label>
          </div>
          {allCategories.map((c) => (
            <div key={c}>
              <input
                type="radio"
                name="category"
                id={c}
                value={c}
                checked={c === category}
                onChange={inputChangeHandler}
              />
              <label htmlFor={c}>{c}</label>
            </div>
          ))}
        </div>
        <div className="form-control">
          <h5>company</h5>
          <select
            name="company"
            onChange={inputChangeHandler}
            className="company"
            value={company ? company : "all"}
          >
            <option value="all">all</option>
            {allCompanies.map((c) => {
              return (
                <option key={c} value={c}>
                  {c}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-control">
          <h5>colors</h5>
          <div className="colors">
            <div>
              <input
                type="radio"
                name="color"
                id="allColors"
                value="all"
                checked={color === "all" || !color}
                onChange={inputChangeHandler}
              />
              <label htmlFor="allColors">all</label>
            </div>
            {allColors.map((c) => (
              <div key={c}>
                <input
                  type="radio"
                  name="color"
                  id={c}
                  value={c}
                  checked={c === color}
                  onChange={inputChangeHandler}
                  className="color-btn"
                />
                <label htmlFor={c} style={{ backgroundColor: c }}>
                  {c === color && <FaCheck />}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="form-control">
          <h5>price</h5>
          <p className="price">{formatPrice(priceRangeValue)}</p>

          <input
            type="range"
            name="priceRange"
            id="priceRange"
            value={priceRangeValue}
            min={minPrice}
            max={maxPrice}
            onChange={inputChangeHandler}
          />
          <div>
            {formatPrice(minPrice)} - {formatPrice(maxPrice)}
          </div>
        </div>
        <div className="form-control shipping">
          <label htmlFor="shipping">Free Shipping</label>
          <input
            type="checkbox"
            name="shipping"
            id="shipping"
            checked={shipping === "free"}
            value="free"
            onChange={inputChangeHandler}
          />
        </div>

        <button
          type="button"
          className="clear-btn"
          onClick={clearFiltersHandler}
        >
          clear filters
        </button>
      </div>
    </section>
  );
};

export default Productsfilter;
