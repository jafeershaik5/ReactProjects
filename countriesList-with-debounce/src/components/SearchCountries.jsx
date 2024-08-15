import React, { useEffect, useState } from "react";
import CountriesList from "./CountriesList";

function SearchCountries() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [countriesList, setCountriesList] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        if (query) {
          const response = await fetch(
            `https://algochurn-server.onrender.com/practice/countries/${query}`
          );
          const result = await response.json();
          setCountries(result.countries);
        } else {
          setCountries([]);
        }
      } catch (error) {
        console.log(error);
      }
    }
    const timerId = setTimeout(getData, 400);
    return () => {
      clearTimeout(timerId);
    };
  }, [query]);

  const handleClick = (i) => {
    const country = countries.filter((item, index) => i === index);

    setCountriesList((prevCountries) => {
      return [...prevCountries, ...country];
    });
  };

  return (
    <>
      <div className="container">
        <div>
          <div className="search">
            <input
              name="countries"
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
          </div>
          <div className="countries-list">
            {countries &&
              countries.map((item, index) => {
                return (
                  <li key={index} onClick={() => handleClick(index)}>
                    {item}
                  </li>
                );
              })}
          </div>
        </div>
        <CountriesList
          countriesList={countriesList}
          setCountriesList={setCountriesList}
        />
      </div>
    </>
  );
}

export default SearchCountries;
