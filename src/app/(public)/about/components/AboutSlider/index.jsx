'use client';

import React, { useMemo } from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import './AboutSlider.scss';

const AboutMemberCard = React.lazy(() => import('../AboutMemberCard'));

const members = [
  {
    id: 1,
    img: '/image/About/person01.png',
    name: 'Tom Cruise',
    position: 'Founder & Chairman',
  },
  {
    id: 2,
    img: '/image/About/person02.png',
    name: 'Emma Watson',
    position: 'Managing Director',
  },
  {
    id: 3,
    img: '/image/About/person03.png',
    name: 'Will Smith',
    position: 'Product Designer',
  },
  {
    id: 4,
    img: '/image/About/person03.png',
    name: 'Will Smith',
    position: 'Product Designer',
  },
  {
    id: 5,
    img: '/image/About/person02.png',
    name: 'Emma Watson',
    position: 'Managing Director',
  },
];

const modulesSwiper = [Pagination];

export default function AboutSlider() {
  const breakpointsSwiper = useMemo(
    () => ({
      320: {
        slidesPerView: 1,
        spaceBetween: 40,
      },
      576: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      992: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    }),
    []
  );
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={30}
      modules={modulesSwiper}
      pagination
      breakpoints={breakpointsSwiper}
    >
      {members.map((member) => {
        return (
          <SwiperSlide key={member.id}>
            <AboutMemberCard {...member} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
