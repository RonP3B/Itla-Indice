import React, { useRef, useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import { RiArrowDownSLine } from "react-icons/ri";
import { nanoid } from "nanoid";

const ComboBox = ({ items, holder, nameValue }) => {
  const { height, setHeight, setSelectedCareer, setSelectedNumSubjects } =
    useGlobalContext();

  const [showBox, setShowBox] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [filterOptions, setFilterOptions] = useState("");

  const cbRef = useRef();
  const searchBox = useRef();

  const selectOption = (option, value) => {
    setSelectedOption(option);

    if (isNaN(value)) setSelectedCareer(value);
    else setSelectedNumSubjects(value);

    setShowBox(false);
    setFilterOptions("");
  };

  const filteredItems = items.filter(
    (option) =>
      option.toString().substring(0, filterOptions.length).toLowerCase() ===
        filterOptions.toLowerCase().trim() ||
      option.toString().toLowerCase().indexOf(filterOptions.trim()) !== -1
  );

  if (showBox) searchBox.current.focus();

  useEffect(() => {
    const handleResize = (myRef) => setHeight(myRef.current.offsetHeight);

    cbRef.current.addEventListener("resize", handleResize(cbRef));
  }, [setHeight]);

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
                onClick={() => selectOption(item, nameValue[index])}
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
