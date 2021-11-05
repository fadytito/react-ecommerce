import React, { useEffect, useState } from "react";

const Dropdown = ({
  options,
  value = "",
  defaultValue = "",
  onSelectChange,
}) => {
  const [selectInputVal, setSelectInputVal] = useState(
    value ? value : defaultValue
  );

  useEffect(() => {
    if (value) {
      setSelectInputVal(value);
    }
  }, [value]);

  useEffect(() => {
    onSelectChange(selectInputVal);
  }, [selectInputVal, onSelectChange]);

  const selectInputChangeHandler = (e) => {
    setSelectInputVal(e.target.value);
  };
  return (
    <div>
      <select value={selectInputVal} onChange={selectInputChangeHandler}>
        {defaultValue && (
          <option value={defaultValue} disabled>
            {defaultValue}
          </option>
        )}
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
