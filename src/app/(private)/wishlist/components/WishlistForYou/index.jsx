'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

import styles from './WishlistForYou.module.scss';

const WishlistCard = React.lazy(() => import('../WishlistCard'));

export default function WishlistForYou() {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        'https://gmen-admin.wii.camp/api/v1.0/products?perPage=20&page=1&sort=1'
      );
      if (response) {
        setProducts(response.data.body?.items);
      }
    } catch {
      return 0;
    }
    return 0;
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <section className={`${styles.wrapper} container`}>
      <div className={`${styles.forYouHeading}`}>
        <div className={`${styles.forYouHeadingTextWrapper}`}>
          <span className={styles.block} />
          <span className={`${styles.forYouHeadingText} font-poppins`}>
            Just For You
          </span>
        </div>
        <Link href="/" className={`${styles.forYouHeadingBtn} font-poppins`}>
          See All
        </Link>
      </div>
      <div
        className={`${styles.forYouList} grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1  gap-[30px]`}
      >
        {products.map((product, index) => {
          const lastIndex = products.length - 1;
          const showLastFour = index >= lastIndex - 3;
          const listItemClassName = showLastFour
            ? styles.forYouListItem
            : styles.hiddenListItem;
          return (
            <div key={product.id} className={listItemClassName}>
              <WishlistCard
                id={product._id}
                name={product.name}
                img={product.cover}
                price={product.price}
                type="foryou"
                sizes={product.variants}
                slug={product.slug}
                discount={Math.floor(Math.random() * 100) + 1}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
