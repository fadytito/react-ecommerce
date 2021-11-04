import React, { useEffect, useState } from "react";

const Dropdown = ({
  options,
  value = "",
  defaultValue = "",
  onSelectChange,
}) => {
  const [selectInputVal, setSelectInputVal] = useState(defaultValue);

  useEffect(() => {
    if (value) {
      setSelectInputVal(value);
    }
  }, [value]);

  useEffect(() => {
    if (selectInputVal === defaultValue) return;
    onSelectChange(selectInputVal);
  }, [selectInputVal, onSelectChange, defaultValue]);

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
