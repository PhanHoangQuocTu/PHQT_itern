/* eslint-disable react/require-default-props */

'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';

import styles from './InputForm.module.scss';

function InputForm({
  name,
  type = 'text',
  className = '',
  placeholder = '',
  ...props
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      {errors[name] && (
        <p className={styles.errorMessage}>{errors[name].message}</p>
      )}
      <input
        {...register(name)}
        type={type}
        name={name}
        className={className}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}

InputForm.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
};

export default React.memo(InputForm);
