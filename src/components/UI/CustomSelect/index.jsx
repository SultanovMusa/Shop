import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Select = ({
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
  const baseStyles =
    "w-full rounded transition ease-in-out duration-150 focus:outline-none focus:ring-1 appearance-none";

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

  return (
    <div className={classNames(className, 'w-full')}>
      <p className="text-Gray text-sm">{label}</p>
      <div className="relative w-full">
        <select
          className={combinedClasses}
          onChange={onChange}
          value={value}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-0 top-[30%] flex items-center px-2 text-gray-500">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

Select.propTypes = {
  variant: PropTypes.oneOf(["default", "admin", "user"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  className: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string,
};

export default Select;
