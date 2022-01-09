//----------------------------Imports----------------------------
import React, { useRef, useEffect, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { nanoid } from "nanoid";

//----------------------------Component----------------------------
const ComboBox = ({ items, holder, cbRef, setValue = 0 }) => {
  //----------------------------States and Refs----------------------------
  const [height, setHeight] = useState(0);
  const [showBox, setShowBox] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [filterOptions, setFilterOptions] = useState("");
  const container = useRef();

  //----------------------------Functions----------------------------
  const selectOption = (option) => {
    if (setValue !== 0) setValue(option);
    setSelectedOption(option);
    setShowBox(false);
    setFilterOptions("");
  };

  const filteredItems = items.filter(
    (option) =>
      option.toString().substring(0, filterOptions.length).toLowerCase() ===
        filterOptions.toLowerCase().trim() ||
      option.toString().toLowerCase().indexOf(filterOptions.trim()) !== -1
  );

  //----------------------------useEffects----------------------------

  //useEffect that handles height size changes
  useEffect(() => {
    const cbCurr = cbRef.current;
    const handleResize = (myRef) => setHeight(myRef.offsetHeight);
    cbCurr.addEventListener("resize", handleResize(cbCurr));

    return () => {
      cbCurr.removeEventListener("resize", handleResize(cbCurr));
    };
  }, [cbRef, setHeight]);

  //useEffect that handles when the user clicks outside de comboBox
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (container.current && !container.current.contains(e.target))
        setShowBox(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [container]);

  //----------------------------Rendering return----------------------------
  return (
    <article className="main__form__box" ref={container}>
      <ul
        className={`main__form__options ${showBox ? "active" : ""}`}
        style={{ top: `${height}px` }}
      >
        {(filteredItems.length > 0 ? filteredItems : items).map(
          (item, index) => {
            return (
              <li
                className="main__form__option"
                onClick={() => selectOption(item)}
                key={nanoid()}
              >
                <label>
                  {item} <input type="radio" />
                </label>
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
        />
      </div>
    </article>
  );
};

export default ComboBox;
