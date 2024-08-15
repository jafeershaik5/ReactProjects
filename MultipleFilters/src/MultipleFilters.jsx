import React, { useEffect, useState } from "react";
import { items as defaultItems } from "./items";

export default function MultipleFilters() {
  const [items, setItems] = useState(defaultItems);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState(defaultItems);

  let filters = ["Bags", "Watches", "Sports", "Sunglasses"];
  const handleClick = (i) => {
    const item = filters[i];
    setSelectedItems((prevItem) => {
      if (selectedItems.includes(item)) {
        return prevItem.filter((el) => el !== item);
      } else {
        return [...prevItem, item];
      }
    });
  };

  useEffect(() => {
    if (selectedItems.length === 0) {
      setFilteredItems(items);
    } else {
      const loweredcategory = selectedItems.map((el) => el.toLowerCase());
      const filtered = items.filter((item) =>
        loweredcategory.includes(item.category.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [selectedItems, items]);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Algochurn Filters</h2>
      <div className="buttons-container">
        {filters.map((el, idx) => (
          <button
            className={`button ${selectedItems.includes(el) ? "active" : ""}`}
            key={`filters-${idx}`}
            onClick={() => handleClick(idx)}
          >
            {el}
          </button>
        ))}
      </div>
      <div className="items-container">
        {filteredItems &&
          filteredItems.map((item, idx) => (
            <div key={`items-${idx}`} className="item">
              <p>{item.name}</p>
              <p className="category">{item.category}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
