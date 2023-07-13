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

import './OutProduct.scss';

const Card = React.lazy(() => import('./components/Card'));
const LoadingSkeleton = React.lazy(() =>
  import('@/components/LoadingSkeleton')
);

function OutProduct({ data }) {
  const [swiper, setSwiper] = useState(true);
  const [canGoPrev, setCanGoPrev] = useState(false);
  const [canGoNext, setCanGoNext] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const swiperRef = useRef();

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data, isLoading]);

  const products = useMemo(() => data?.body?.items || [], [data]);
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
  let count = 0;

  const handleControlSwiperLeft = useCallback(() => {
    swiperRef.current.swiper.slidePrev();
    setCanGoNext(true);
    if (swiper.isBeginning) {
      setCanGoPrev(false);
    }
  }, [swiper.isBeginning]);

  const handleControlSwiperRight = useCallback(() => {
    swiperRef.current.swiper.slideNext();
    setCanGoPrev(true);
    if (swiper.isEnd) {
      setCanGoNext(false);
    }
  }, [swiper.isEnd]);

  const handleSwiper = useCallback((swiperInput) => {
    setSwiper(swiperInput);
  }, []);

  return (
    <div className="ourproduct-wrapper container font-poppins">
      <div className="today">
        <span className="block" />
        <span>Our Products</span>
      </div>
      <div className="outproduct-control-swiper">
        <h1 className="font-inter">Explore Out Products</h1>
        <div className="btn-swiper">
          <button
            type="button"
            aria-label="button control"
            onClick={handleControlSwiperLeft}
            className={classNames('btn-control-swiper', {
              disabled: canGoPrev === false,
            })}
          >
            <ArrowLeft className="arrow-left-icon" />
          </button>
          <button
            type="button"
            aria-label="button control"
            onClick={handleControlSwiperRight}
            className={classNames('btn-control-swiper', {
              disabled: canGoNext === false,
            })}
          >
            <ArrowRight className="arrow-right-icon" />
          </button>
        </div>
      </div>
      <div className="product">
        {isLoading === true ? (
          <LoadingSkeleton className="w-full h-[732px]" />
        ) : (
          <Swiper
            onSwiper={handleSwiper}
            onReachEnd={() => {
              setCanGoPrev(true);
            }}
            onReachBeginning={() => {
              setCanGoPrev(true);
            }}
            ref={swiperRef}
            slidesPerView={4}
            spaceBetween={30}
            breakpoints={breakpointsSwiper}
          >
            {products.map((product, index) => {
              let sizeRow = 8;
              const lengthProduct = Math.ceil(products.length / 2);
              if (lengthProduct > sizeRow) {
                sizeRow = lengthProduct;
              }
              if (count < sizeRow) {
                const newProduct = products[sizeRow + index];
                count += 1;
                return (
                  <SwiperSlide key={count}>
                    <Card
                      id={product._id}
                      className="mb-[60px]"
                      img={product.cover}
                      name={product.name}
                      sale={product.price}
                      count={80}
                      sizes={product.variants}
                      slug={product.slug}
                    />
                    {newProduct && (
                      <SwiperSlide>
                        <Card
                          className={classNames('flex-1')}
                          id={newProduct._id}
                          img={newProduct.cover}
                          name={newProduct.name}
                          sale={newProduct.price}
                          count={80}
                          color
                          sizes={newProduct.variants}
                          slug={newProduct.slug}
                        />
                      </SwiperSlide>
                    )}
                  </SwiperSlide>
                );
              }
              return null;
            })}
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

OutProduct.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
};

export default React.memo(OutProduct);
