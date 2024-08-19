import React, { useState } from "react";

let checkboxes = ["Volvo", "VolksWagen", "Skoda", "BMW", "Rolls Royce", "Tata"];

function SelectAll() {
  const [checked, setChecked] = useState(
    Array.from({ length: checkboxes.length }).fill(false)
  );
  const [selectAll, setSelectAll] = useState(false);
  console.log(selectAll);
  const changeHandler = (i) => {
    const updatedCheck = checked.map((item, index) => {
      return i === index ? !item : item;
    });
    setChecked(updatedCheck);
    setSelectAll(false);
  };

  const handleSelectAll = () => {
    const allChecked = Array.from({ length: checkboxes.length }).fill(
      !selectAll
    );
    setChecked(allChecked);
    setSelectAll(!selectAll);
  };
  return (
    <div>
      <input
        type="checkbox"
        name="selectall"
        onChange={handleSelectAll}
        checked={selectAll}
      />
      <label htmlFor="selectall">SelectAll</label>
      <hr />
      {checkboxes.map((item, index) => {
        return (
          <div className="check-box" key={index}>
            <input
              type="checkbox"
              name={item}
              onChange={() => changeHandler(index)}
              checked={checked[index]}
            />
            <label htmlFor={item}>{item}</label>
          </div>
        );
      })}
    </div>
  );
}

export default SelectAll;
