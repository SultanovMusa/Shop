import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Input = ({
  type = "text",
  variant = "admin",
  size = "small",
  className = "",
  onChange,
  placeholder,
  label,
  value,
  ...props
}) => {
  
  const baseStyles =
    "w-full rounded transition ease-in-out duration-150 focus:outline-none focus:ring-1 text-Gray";

  const variantStyles = {
    admin:
      "border border-gray-400 focus:border-adminBlue focus:ring-adminBlue",
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
      <input
        type={type}
        className={combinedClasses}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        {...props}
      />
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  variant: PropTypes.oneOf(["default", "admin", "user"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  className: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Input;
