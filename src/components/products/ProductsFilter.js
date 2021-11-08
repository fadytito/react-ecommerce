import React from "react";
import styled from "styled-components";
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
      shipping:
        name === "shipping" ? (!checked ? "all" : "free") : filters.shipping,
    };
    filtersChangeHandler(updatedFilters);
  };

  return (
    <StyledWrapper>
      <div className="content">
        <div className="form-control">
          <input
            name="name"
            type="text"
            className="search-input"
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
        <div className="form-control">
          <h5>colors</h5>
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
        <div className="form-control">
          <h5>price</h5>
          <p className="price">{priceRangeValue}</p>

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
            {minPrice} - {maxPrice}
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
    </StyledWrapper>
  );
};

const StyledWrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Productsfilter;
