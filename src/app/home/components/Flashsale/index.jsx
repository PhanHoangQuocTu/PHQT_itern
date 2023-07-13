/* eslint-disable react/forbid-prop-types */

'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';

import ArrowLeft from '@/svgs/icons_arrow-left.svg';
import ArrowRight from '@/svgs/icons_arrow-right.svg';

import './Flashsale.scss';

const Card = React.lazy(() => import('./components/Card'));
const TimeCountDown = React.lazy(() => import('./components/TimeCountDown'));
const LoadingSkeleton = React.lazy(() =>
  import('@/components/LoadingSkeleton')
);

function Flashsale({ data }) {
  const [canGoPrev, setCanGoPrev] = useState(false);
  const [canGoNext, setCanGoNext] = useState(true);
  const swiperRef = useRef();
  const [isLoading, setIsLoading] = useState(true);

  const products = useMemo(() => data?.body?.items || [], [data]);

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data, isLoading]);

  const breakpointsSwiper = useMemo(
    () => ({
      320: {
        slidesPerView: 1,
        spaceBetween: 50,
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
    }),
    []
  );

  const handleControlSwiperLeft = useCallback(() => {
    swiperRef.current.swiper.slidePrev();
    setCanGoNext(true);
    if (swiperRef.current.swiper.isBeginning) {
      setCanGoPrev(false);
    }
  }, []);

  const handleControlSwiperRight = useCallback(() => {
    swiperRef.current.swiper.slideNext();
    setCanGoPrev(true);
    if (swiperRef.current.swiper.isEnd) {
      setCanGoNext(false);
    }
  }, []);

  return (
    <div className="flashsale-wrapper container font-poppins">
      <div className="today">
        <span className="block" />
        <span>Today&apos;s</span>
      </div>
      <div className="flashsale">
        <h1 className="font-inter">Flash Sales</h1>
        <TimeCountDown />
        <div className="btn-swiper">
          <button
            type="button"
            aria-label="button control"
            onClick={handleControlSwiperLeft}
            className={classNames('btn-control-swiper', {
              disabled: !canGoPrev,
            })}
          >
            <ArrowLeft className="arrow-left" />
          </button>
          <button
            type="button"
            aria-label="button control"
            onClick={handleControlSwiperRight}
            className={classNames('btn-control-swiper', {
              disabled: !canGoNext,
            })}
          >
            <ArrowRight className="arrow-right" />
          </button>
        </div>
      </div>
      <div className="product-fs">
        {isLoading === true ? (
          <LoadingSkeleton className="w-full h-[351px]" />
        ) : (
          <Swiper
            onReachEnd={() => setCanGoPrev(true)}
            onReachBeginning={() => setCanGoPrev(true)}
            ref={swiperRef}
            slidesPerView={4}
            spaceBetween={30}
            breakpoints={breakpointsSwiper}
          >
            {products.map((product) => (
              <SwiperSlide key={product._id}>
                <Card
                  id={product._id}
                  img={product.cover}
                  typeDiscount={product.discountType}
                  discount={product.discount}
                  name={product.name}
                  sale={product.discountedPrice}
                  price={product.price}
                  count={80}
                  sizes={product.variants}
                  slug={product.slug}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      <div className="view-all-product">
        <button
          aria-label="btn"
          type="button"
          className="view-all-product__btn"
        >
          <Link href="/">View All Products</Link>
        </button>
      </div>
    </div>
  );
}

Flashsale.propTypes = {
  data: PropTypes.object.isRequired,
};

export default React.memo(Flashsale);
