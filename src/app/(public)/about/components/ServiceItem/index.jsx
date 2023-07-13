import React from 'react';
import PropTypes from 'prop-types';

import styles from './ServiceItem.module.scss';

export default function ServiceItem({ children, name, description }) {
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.icon}`}>{children}</div>
      <span className={`${styles.name} font-poppins`}>{name}</span>
      <span className={`${styles.description} font-poppins`}>
        {description}
      </span>
    </div>
  );
}

ServiceItem.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
