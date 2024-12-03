import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  type = 'text',
  placeholder,
  name,
  value,
  onChange,
  id,
  className = '',
  label,
  ...rest
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id || name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id || name}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...rest}
      />
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
};

export default Input;

