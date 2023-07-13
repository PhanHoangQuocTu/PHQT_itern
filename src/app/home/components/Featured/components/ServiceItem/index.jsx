import React from 'react';
import PropTypes from 'prop-types';

import styles from './ServiceItem.module.scss';

function ServiceItem({ children, name, description }) {
  return (
    <div className={`${styles.wrapper} font-poppins`}>
      <div className={`${styles.icon}`}>{children}</div>
      <span className={`${styles.name}`}>{name}</span>
      <span className={`${styles.description}`}>{description}</span>
    </div>
  );
}

ServiceItem.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default React.memo(ServiceItem);
