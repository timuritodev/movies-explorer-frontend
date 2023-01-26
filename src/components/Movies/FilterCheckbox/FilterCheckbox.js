import React from "react";

function FilterCheckbox() {
  return (
    <label className="filter-checkbox">
      <input className="filter-checkbox__input input checkbox" type="checkbox" />
        <span className="filter-checkbox__text">Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;
