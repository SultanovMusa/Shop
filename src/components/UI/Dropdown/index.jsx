import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export const Dropdown = ({
  children,
  variant = "user",
  className,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={classNames("relative", className)}
      ref={dropdownRef}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (child.type === DropdownTrigger) {
          return React.cloneElement(child, {
            onClick: (e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            },
          });
        }
        if (child.type === DropdownMenu) {
          return React.cloneElement(child, { isOpen });
        }
        return child;
      })}
    </div>
  );
};

Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export const DropdownTrigger = ({ children, onClick, ...props }) => (
  <div onClick={onClick} {...props}>
    {children}
  </div>
);

DropdownTrigger.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export const DropdownMenu = ({ children, className, isOpen, ...props }) => (
  <div
    className={classNames(
      "absolute top-full right-0 mt-2 w-fit min-w-32 rounded-md shadow-xl bg-gray-50 ring-1 ring-black ring-opacity-5 overflow-hidden p-1 transition-all duration-300 ease-in-out",
      {
        "opacity-0 invisible translate-y-[-10px]": !isOpen,
        "opacity-100 visible translate-y-0": isOpen,
      },
      className
    )}
    {...props}
  >
    {children}
  </div>
);

DropdownMenu.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isOpen: PropTypes.bool,
};

export const DropdownItem = ({
  variant = "user",
  children,
  className,
  ...props
}) => {
  const variantStyles = {
    admin: "hover:bg-adminBlue",
    user: "hover:bg-userPink",
  };
  const combinedClasses = classNames(
    "cursor-pointer select-none relative py-2 pl-3 pr-9 text-Gray hover:text-white text-sm rounded-md px-1",
    variantStyles[variant],
    className
  );
  return (
    <div className={combinedClasses} {...props}>
      {children}
    </div>
  );
};

DropdownItem.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(["user", "admin"]),
};