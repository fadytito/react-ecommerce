import React from "react";
import { useFiltersContext } from "../../context/filters-context";

const Productsfilter = () => {
  const { filters, filtersChangeHandler } = useFiltersContext();
  const { name } = filters;

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    filtersChangeHandler(updatedFilters);
  };

  return (
    <div>
      <input
        name="name"
        type="text"
        value={name}
        onChange={inputChangeHandler}
      />
    </div>
  );
};

export default Productsfilter;
