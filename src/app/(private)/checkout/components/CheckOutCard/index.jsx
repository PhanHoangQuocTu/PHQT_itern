'use client';

import React, { useEffect } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import PropTypes from 'prop-types';

import styles from './CheckOutCard.module.scss';

function CheckOutCard({ name, img, price, onTotalChange }) {
  useEffect(() => {
    onTotalChange(price);
  }, [onTotalChange, price]);

  return (
    <div className={classNames(styles.wrapper, 'mx-0')}>
      <div className={classNames(styles.item, 'px-0', 'font-poppins')}>
        <Image
          src={img}
          alt="product item"
          fill
          sizes="(max-width: 768px) 100vw"
          className={classNames(
            'object-contain',
            'relative',
            'max-w-[54px]',
            'max-h-[54px]'
          )}
        />
        <span>{name}</span>
      </div>
      <div className={classNames(styles.item, 'px-0', 'font-poppins')}>
        <span>${price.toFixed(2)}</span>
      </div>
    </div>
  );
}

CheckOutCard.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onTotalChange: PropTypes.func.isRequired,
};

export default React.memo(CheckOutCard);
