import React, { useState } from "react";
import { data } from "./data";
function TransferList() {
  const [leftItems, setLeftItems] = useState(data);
  const [rightItems, setRightItems] = useState([]);

  const selectHandler = (pos, side) => {
    if (side === "left") {
      setLeftItems((prevItems) =>
        prevItems.map((item, index) => {
          return index === pos ? { ...item, checked: !item.checked } : item;
        })
      );
    } else {
      setRightItems((prevItems) =>
        prevItems.map((item, index) => {
          return index === pos ? { ...item, checked: !item.checked } : item;
        })
      );
    }
  };
  //   console.log("leftItems ==>", leftItems);
  //   console.log("rightItems ==> ", rightItems);

  const moveForward = () => {
    const itemsToMove = leftItems
      .filter((item, index) => {
        return item.checked;
      })
      .map((item, index) => {
        return { ...item, checked: !item.checked };
      });
    setLeftItems((prevItems) =>
      prevItems.filter((item, index) => {
        return !item.checked;
      })
    );
    setRightItems((prevItems) => {
      return [...prevItems, ...itemsToMove];
    });
  };

  const moveBackward = () => {
    const itemsToMove = rightItems
      .filter((item, index) => {
        return item.checked;
      })
      .map((item, index) => {
        return { ...item, checked: !item.checked };
      });
    setRightItems((prevItems) =>
      prevItems.filter((item, index) => {
        return !item.checked;
      })
    );
    setLeftItems((prevItems) => [...prevItems, ...itemsToMove]);
  };

  return (
    <>
      <div className="container">
        <div className="left-container">
          {leftItems.map((item, index) => {
            return (
              <li key={item.id}>
                <input
                  type="checkbox"
                  id={`left-${item.id}`}
                  onChange={() => selectHandler(index, "left")}
                />
                <label htmlFor={`left-${item.id}`}>{item.title}</label>
              </li>
            );
          })}
        </div>
        <div className="buttons">
          <button onClick={() => moveForward()}>{"→"}</button>
          <button onClick={() => moveBackward()}>{"←"}</button>
        </div>
        <div className="right-container">
          {rightItems &&
            rightItems.map((item, index) => {
              return (
                <li key={item.id}>
                  <input
                    type="checkbox"
                    id={`right-${item.id}`}
                    onChange={() => selectHandler(index, "right")}
                  />
                  <label htmlFor={`right-${item.id}`}>{item.title}</label>
                </li>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default TransferList;
