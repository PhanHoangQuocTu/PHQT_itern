/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-undef */

'use client';

import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import './SwiperSlider.scss';

const Slider = React.lazy(() => import('../Slider'));
const LoadingSkeleton = React.lazy(() =>
  import('@/components/LoadingSkeleton')
);

const modulesSwiper = [Pagination];
const paginationSwiper = { clickable: true };

export default function SwiperSlider({ data }) {
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const breakpointsSwiper = useMemo(
    () => ({
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      576: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 40,
      },
      992: {
        slidesPerView: 1,
        spaceBetween: 40,
      },
      1200: {
        slidesPerView: 1,
        spaceBetween: 50,
      },
    }),
    []
  );

  useEffect(() => {
    setSlides(data);
  }, [data]);

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  const swiperSlides = useMemo(
    () =>
      slides?.body?.map((slide) => (
        <SwiperSlide key={slide._id}>
          <Slider
            img={slide.image}
            title={slide.title}
            discount={slide.description}
          />
        </SwiperSlide>
      )),
    [slides?.body]
  );

  if (isLoading) {
    return (
      <LoadingSkeleton className="xs:ml-0 mt-[40px] xl:ml-[45px] w-full xl:w-[892px] h-[344px]" />
    );
  }

  return (
    <div className="slider flex-auto w-full">
      <Swiper
        modules={modulesSwiper}
        spaceBetween={0}
        slidesPerView={1}
        pagination={paginationSwiper}
        breakpoints={breakpointsSwiper}
      >
        {swiperSlides}
      </Swiper>
    </div>
  );
}

SwiperSlider.propTypes = {
  data: PropTypes.object.isRequired,
};
