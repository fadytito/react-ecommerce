import React from "react";
import { useProductsContext } from "../../context/products-context";

const Productsfilter = ({
  allCategories,
  allCompanies,
  allColors,
  minPrice,
  maxPrice,
}) => {
  const {
    products: { filters },
    filtersChangeHandler,
    clearFiltersHandler,
  } = useProductsContext();
  const { name, category, company, color, priceRange, shipping } = filters;

  const priceRangeValue = priceRange ? priceRange : maxPrice;

  const inputChangeHandler = (e) => {
    const { name, value, checked } = e.target;
    const updatedFilters = {
      ...filters,
      [name]: value,
      shipping: name === "shipping" && checked ? value : "",
    };
    filtersChangeHandler(updatedFilters);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input
        name="name"
        type="text"
        value={name}
        onChange={inputChangeHandler}
      />
      <div>
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
      <div>
        <div>
          <input
            type="radio"
            name="company"
            id="allCompanies"
            value="all"
            checked={company === "all" || !company}
            onChange={inputChangeHandler}
          />
          <label htmlFor="allCompanies">all</label>
        </div>
        {allCompanies.map((c) => (
          <div key={c}>
            <input
              type="radio"
              name="company"
              id={c}
              value={c}
              checked={c === company}
              onChange={inputChangeHandler}
            />
            <label htmlFor={c}>{c}</label>
          </div>
        ))}
      </div>
      <div>
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
            />
            <label htmlFor={c}>{c}</label>
          </div>
        ))}
      </div>
      <div>
        <label>price range</label>
        {minPrice}
        {priceRangeValue}
        <input
          type="range"
          name="priceRange"
          id="priceRange"
          value={priceRangeValue}
          min={minPrice}
          max={maxPrice}
          onChange={inputChangeHandler}
        />
        {maxPrice}
      </div>
      <div>
        <input
          type="checkbox"
          name="shipping"
          id="shipping"
          checked={shipping === "free" ? true : false}
          value="free"
          onChange={inputChangeHandler}
        />
        <label htmlFor="shipping">Free Shipping</label>
      </div>

      <button onClick={clearFiltersHandler}>clear filters</button>
    </div>
  );
};

export default Productsfilter;
