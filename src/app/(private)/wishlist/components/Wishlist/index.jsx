/* eslint-disable consistent-return */

'use client';

import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './Wishlist.module.scss';

const WishlistCard = React.lazy(() => import('../WishlistCard'));

export default function Wishlist() {
  const [products, setProducts] = useState([]);
  const breakpointsSwiper = useMemo(
    () => ({
      320: {
        slidesPerView: 1,
        spaceBetween: 40,
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
        slidesPerView: 4,
        spaceBetween: 40,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
    }),
    []
  );

  useEffect(() => {
    const account = Cookies.get('userData')
      ? JSON.parse(Cookies.get('userData'))
      : null;
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          'https://gmen-admin.wii.camp/api/v1.0/products?perPage=20&page=1&sort=1'
        );
        const { data } = response;
        const allProducts = data.body.items;

        const wishlistItem = localStorage.getItem('wishlistItems');
        const parsedWishlistItem = JSON.parse(wishlistItem);

        if (parsedWishlistItem && parsedWishlistItem[account.token]) {
          const wishlistProductIds = parsedWishlistItem[account.token];
          const filteredProducts = allProducts.filter((product) =>
            wishlistProductIds.includes(product._id)
          );
          setProducts(filteredProducts);
        } else {
          setProducts(allProducts);
        }
      } catch (error) {
        return error;
      }
    };

    if (account) {
      fetchProducts();
    }
  }, []);

  return (
    <section className={`${styles.wrapper} container`}>
      <div className={`${styles.wishlistHeading}`}>
        <span className={`${styles.wishlistHeadingText} font-poppins`}>
          Wishlist ({products.length})
        </span>
        <button
          aria-label="btn"
          type="button"
          className={`${styles.wishlistHeadingBtn} font-poppins`}
        >
          Move All To Bag
        </button>
      </div>
      <div className={`${styles.wishlistList}`}>
        <Swiper
          className={`${styles.swiperContainer}`}
          slidesPerView={4}
          spaceBetween={30}
          breakpoints={breakpointsSwiper}
        >
          {products.map((product) => {
            return (
              <SwiperSlide key={product._id}>
                <WishlistCard
                  id={product._id}
                  name={product.name}
                  img={product.cover}
                  price={product.price}
                  type="wishlist"
                  sizes={product.variants}
                  slug={product.slug}
                  discount={Math.floor(Math.random() * 100) + 1}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
