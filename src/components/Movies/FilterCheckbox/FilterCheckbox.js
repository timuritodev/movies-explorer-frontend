import React from "react";

function FilterCheckbox({ filtercheckbox, handleCheckbox }) {
  return (
    <label className="filter-checkbox">
      <input className="filter-checkbox__input input checkbox" name="checkbox" id="checkbox" type="checkbox" checked={filtercheckbox} onChange={() => handleCheckbox(!filtercheckbox)}/>
        <span className="filter-checkbox__text">Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;
