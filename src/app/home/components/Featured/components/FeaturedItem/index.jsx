/* eslint-disable react/require-default-props */
import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './FeaturedItem.module.scss';

export default function FeaturedItem({
  className = '',
  imgClassName = '',
  children,
  name,
  description,
}) {
  return (
    <div className={`${className} ${styles.wrapper} font-poppins`}>
      <div className={`${imgClassName} ${styles.image} relative`}>
        {children}
      </div>
      <div className={`${styles.content}`}>
        <span className={`${styles.name} font-inter`}>{name}</span>
        <span className={`${styles.description}`}>{description}</span>
        <Link href="/" className={`${styles.link}`}>
          Shop Now
        </Link>
      </div>
    </div>
  );
}

FeaturedItem.propTypes = {
  className: PropTypes.string,
  imgClassName: PropTypes.string,
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
