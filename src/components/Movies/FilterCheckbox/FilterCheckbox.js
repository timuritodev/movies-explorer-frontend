import React from "react";

function FilterCheckbox({ filterCheckbox, onClickCheckbox }) {
  return (
    <label className="filter-checkbox">
      <input className="filter-checkbox__input input checkbox" name="checkbox" id="checkbox" type="checkbox" checked={filterCheckbox} onChange={() => onClickCheckbox(!filterCheckbox)}/>
        <span className="filter-checkbox__text">Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;
