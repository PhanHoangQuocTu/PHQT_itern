'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';

import './Bestseller.scss';

const Card = React.lazy(() => import('./components/Card'));
const TimeCountDown = React.lazy(() => import('./components/TimeCountDown'));
const LoadingSkeleton = React.lazy(() =>
  import('@/components/LoadingSkeleton')
);
function BestSeller({ data }) {
  const products = useMemo(() => data?.body?.items || [], [data]);
  const [isLoading, setIsLoading] = useState(true);
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

  return (
    <div className="bestseller-wrapper container font-poppins">
      <div className="bestseller-heading">
        <span className="block" />
        <span>This Month</span>
      </div>
      <div className="bestseller-control">
        <h1 className="font-inter">Best Selling Products</h1>
        <div className="view-all">
          <button aria-label="btn" type="button" className="btn-view-all">
            <Link href="/" className="btn-view-all__link">
              View All
            </Link>
          </button>
        </div>
      </div>
      <div className="product-bs">
        {isLoading === true ? (
          <LoadingSkeleton className="w-full h-[351px]" />
        ) : (
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            breakpoints={breakpointsSwiper}
          >
            {products.length > 0 &&
              products.map((product) => {
                return (
                  <SwiperSlide key={product._id}>
                    <Card
                      id={product._id}
                      img={product.cover}
                      name={product.name}
                      sale={product.discountedPrice}
                      price={product.price}
                      count={80}
                      sizes={product.variants}
                      slug={product.slug}
                    />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        )}
      </div>

      <div className="banner-product">
        <div className="banner-product__img">
          <Image
            src="/image/Bestselling/image-bestselling.png"
            alt="best selling"
            fill
            sizes="(max-width: 768px) 100vw"
            quality={80}
            priority
          />
        </div>
        <div className="banner-product__text">
          <span className="banner-product__text-categories">Categories</span>
          <span className="banner-product__text-content font-inter">
            Enhance Your Music Experience
          </span>
          <TimeCountDown />
          <button
            aria-label="btn"
            type="button"
            className="banner-product__btn"
          >
            <Link href="/">Buy Now</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

BestSeller.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
};

export default React.memo(BestSeller);
