//----------------------------Imports----------------------------
import React, { useRef, useEffect, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { nanoid } from "nanoid";

//----------------------------Component----------------------------
const ComboBox = ({ items, holder, itemsValue, cbRef, setValue }) => {
  //----------------------------Hooks----------------------------
  const [height, setHeight] = useState(0);
  const [showBox, setShowBox] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [filterOptions, setFilterOptions] = useState("");
  const searchBox = useRef();

  //----------------------------Functions----------------------------
  const selectOption = (option, value) => {
    setSelectedOption(option);
    setValue(value);
    setShowBox(false);
    setFilterOptions("");
  };

  const filteredItems = items.filter(
    (option) =>
      option.toString().substring(0, filterOptions.length).toLowerCase() ===
        filterOptions.toLowerCase().trim() ||
      option.toString().toLowerCase().indexOf(filterOptions.trim()) !== -1
  );

  //Focus on the text input
  if (showBox) searchBox.current.focus();

  //useEffect that handles height size changes
  useEffect(() => {
    const cbCurr = cbRef.current;
    const handleResize = (myRef) => setHeight(myRef.offsetHeight);
    cbCurr.addEventListener("resize", handleResize(cbCurr));

    return () => {
      cbCurr.removeEventListener("resize", handleResize(cbCurr));
    };
  }, [cbRef, setHeight]);

  //----------------------------Rendering return----------------------------
  return (
    <article className="main__form__box">
      <ul
        className={`main__form__options ${showBox ? "active" : ""}`}
        style={{ top: `${height}px` }}
      >
        {(filteredItems.length > 0 ? filteredItems : items).map(
          (item, index) => {
            return (
              <li
                className="main__form__option"
                onClick={() => selectOption(item, itemsValue[index])}
                key={nanoid()}
              >
                <input type="radio" />
                <label>{item}</label>
              </li>
            );
          }
        )}
      </ul>
      <div
        className="main__form__selected"
        ref={cbRef}
        onClick={() => setShowBox(!showBox)}
      >
        <p>{selectedOption || holder}</p>
        <RiArrowDownSLine />
      </div>
      <div className="main__form__search-box">
        <input
          type="text"
          placeholder="Buscar..."
          value={filterOptions}
          onChange={(e) => setFilterOptions(e.target.value)}
          tabIndex="0"
          ref={searchBox}
          onBlur={() => {
            setTimeout(() => [setShowBox(false), setFilterOptions("")], 100);
          }}
        />
      </div>
    </article>
  );
};

export default ComboBox;
