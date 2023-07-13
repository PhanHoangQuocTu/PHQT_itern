/* eslint-disable react/require-default-props */
import React from 'react';
import LazyLoad from 'react-lazyload';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';

import ArrowRight from '@/svgs/Banner/arrow-right.svg';

import './Slider.scss';

function Slider({ img, title, discount }) {
  return (
    <div className="slider-item relative container font-poppins">
      <div className="wrapper absolute">
        <div className="slider-item__content">
          <div className="slider-item__title">
            <span>{title}</span>
          </div>
          <div className="slider-item__discount">
            <span className={classNames('font-inter')}>{discount}</span>
          </div>
          <div className="slider-item__link">
            <Link href="/">Shop Now</Link>
            <ArrowRight className="arrow-right-icon" />
          </div>
        </div>
        <LazyLoad>
          <Image
            src={img}
            alt="banner"
            fill
            sizes="(max-width: 768px) 100vw"
            priority
            className="xl:w-[892px] h-[344px]"
          />
        </LazyLoad>
      </div>
    </div>
  );
}

Slider.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  discount: PropTypes.string.isRequired,
};

export default React.memo(Slider);
