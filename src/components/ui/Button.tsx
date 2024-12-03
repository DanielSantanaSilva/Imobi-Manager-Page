import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Button = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary', // Variantes: 'primary', 'secondary', 'danger', etc.
  className = '', // Classes extras
  ...rest
}) => {
  const baseStyles = 'px-4 py-2 font-semibold rounded focus:outline-none focus:ring-2';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    disabled: 'bg-gray-400 text-gray-200 cursor-not-allowed',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        baseStyles,
        disabled ? variants.disabled : variants[variant],
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']), // Lista de variantes suportadas
  className: PropTypes.string,
};

export default Button;

