import React from "react";

function CountriesList({ countriesList, setCountriesList }) {
  console.log("Render");
  const handleDelete = (i) => {
    const updatedCoutries = countriesList.filter((item, index) => i !== index);
    setCountriesList(updatedCoutries);
  };
  return (
    <div>
      {countriesList &&
        countriesList.map((item, index) => {
          return (
            <li key={index}>
              {item} <span onClick={() => handleDelete(index)}>␡</span>
            </li>
          );
        })}
    </div>
  );
}

export default React.memo(CountriesList);
