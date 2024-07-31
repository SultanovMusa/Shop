import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const DynamicTextArea = ({
  variant = "admin",
  size = "small",
  className = "",
  onChange,
  placeholder,
  label,
  value,
  ...props
}) => {
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (textAreaRef.current) {
      // Reset height to auto to calculate the new scrollHeight
      textAreaRef.current.style.height = "auto";
      // Set the height to the scrollHeight to adjust the size
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [value]); // This effect runs whenever the value changes

  const baseStyles =
    "w-full rounded transition ease-in-out duration-150 focus:outline-none focus:ring-1 text-Gray resize-none";

  const variantStyles = {
    admin: "border border-gray-400 focus:border-adminBlue focus:ring-adminBlue",
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
    <div className={classNames(className, "w-full")}>
      <p className="text-Gray text-sm">{label}</p>
      <textarea
        ref={textAreaRef}
        className={combinedClasses}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        {...props}
      />
    </div>
  );
};

DynamicTextArea.propTypes = {
  variant: PropTypes.oneOf(["default", "admin", "user"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  className: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default DynamicTextArea;
