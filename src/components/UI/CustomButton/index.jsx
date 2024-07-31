import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { LoadingIcon } from '@/assets/icons/Icons';

const Button = ({
  type = 'button',
  variant = 'admin',
  size = 'medium',
  className = '',
  onClick,
  children,
  isLoading,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded transition ease-in-out duration-150 active:scale-95 min-h-8 min-w-28';
  
  const variantStyles = {
    admin: isLoading ? 'bg-adminBlue/80' : 'bg-adminBlue text-white hover:bg-adminBlue/80 focus:adminBlue/80',
    user: isLoading ? 'bg-userPink/80': 'bg-userPink text-white hover:bg-userPink/70 focus:userPink/60'
  };
  
  const sizeStyles = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };
  
  const disabledStyles = 'bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none';

  const combinedClasses = classNames(
    baseStyles,
    disabled ? disabledStyles : variantStyles[variant],
    sizeStyles[size],
    className
  );

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <LoadingIcon />
      ) : children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['admin', 'user']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Button;
