import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { IoIosArrowDown } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";

const NestedSelect = ({
  variant = "admin",
  size = "small",
  className = "",
  onChange,
  value,
  options,
  placeholder,
  label,
  ...props
}) => {
  const [open, setOpen] = useState([-1, -1, -1, -1]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);
  const colors = ["#449EF2", "#2FC509", "#F99808", "#8B0000"];

  const handleOpenItem = (column, index) => {
    let newOpen = [...open];
    if (open[column] === index) {
      newOpen = newOpen.map((item, forIndex) =>
        column <= forIndex ? -1 : item
      );
    } else {
      newOpen[column] = index;
      newOpen = newOpen.map((item, forIndex) =>
        column < forIndex ? -1 : item
      );
    }
    setOpen(newOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const baseStyles =
    "w-full rounded transition ease-in-out duration-150 focus:outline-none focus:ring-1";

  const variantStyles = {
    admin:
      "bg-white border border-gray-400 focus:border-adminBlue focus:ring-adminBlue",
    user: "bg-white border border-userPink focus:border-userPink focus:ring-userPink",
  };

  const sizeStyles = {
    small: "px-2 py-[7px] text-sm",
    medium: "px-3 py-2 text-base",
    large: "px-4 py-3 text-lg",
  };

  const combinedClasses = classNames(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onChange(option.id);
    setIsOpen(false);
    setOpen([-1, -1, -1, -1])
  };

  const renderOptions = (categories, level = 0) => {
    return categories.map((category) => (
      <div key={category.id} style={{ paddingLeft: `${level * 20}px` }}>
        <div
          className="cursor-pointer hover:bg-gray-100 p-2"
          onClick={() => handleSelect(category)}
        >
          {category.name}
        </div>
        {category.categoryResponses &&
          category.categoryResponses.length > 0 && (
            <div className="pl-4">
              {renderOptions(category.categoryResponses, level + 1)}
            </div>
          )}
      </div>
    ));
  };

  const Generate = ({ item, column, index }) => {
    return (
      <div
        className={`w-full h-fit border-[1px] border-solid border-gray-300 transition-all duration-1000 ease-in-out bg-gray-50 shadow-md relative`}
      >
        <div
          style={{ backgroundColor: colors[column] }}
          className={`absolute left-0 top-0 bottom-0 w-[6px] transition-all duration-500 ease-linear`}
        ></div>
        <div className="w-full h-10 flex ">
          <div className="w-full h-10 min-h-10 flex items-center justify-between px-4 gap-2">
            <div className="flex items-center gap-1">
              {column < 3 && (
                <IoIosArrowDown
                  onClick={() =>
                    item.categoryResponses && handleOpenItem(column, index)
                  }
                  className={`${
                    item.categoryResponses ? "text-Gray" : "text-gray-300"
                  } transition-all duration-500 cursor-pointer ${
                    open[column] === index ? "rotate-180" : "rotate-0"
                  }`}
                />
              )}
              <p className="text-xs text-Gray">{item.name}</p>
            </div>
            <FaPlus onClick={() => handleSelect(item)} className="text-Gray bg-gray-200 text-2xl p-[5px] rounded-full cursor-pointer" />
          </div>
        </div>
        <div
          className={`flex flex-col gap-1 ${
            item.categoryResponses
              ? open[column] === index
                ? "h-fit pr-2 py-2 pl-4"
                : "h-0"
              : "hidden"
          }`}
        >
          {open[column] === index &&
            item.categoryResponses &&
            item.categoryResponses.map((innerItem, index) => (
              <Generate
                item={innerItem}
                key={index}
                column={column + 1}
                index={index}
              />
            ))}
        </div>
      </div>
    );
  };

  return (
    <div className={classNames(className, "w-full relative")} ref={dropdownRef}>
      <p className="text-Gray text-sm">{label}</p>
      <div className={combinedClasses} onClick={toggleOpen}>
        {selectedOption ? <span className="text-Gray">{selectedOption.name}</span> : <span className="text-Gray">{placeholder}</span>}
        <span className="absolute right-2 top-[69%] transform -translate-y-1/2">
        <IoIosArrowDown className="text-Gray" />
        </span>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-48 overflow-auto">
          {options?.map((item, index) => (
            <Generate
              item={item}
              key={index}
              index={index}
              color="#449EF2"
              column={0}
            />
          ))}
        </div>
      )}
    </div>
  );
};

NestedSelect.propTypes = {
  variant: PropTypes.oneOf(["admin", "user"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  className: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      categoryResponses: PropTypes.array,
    })
  ).isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
};

export default NestedSelect;
