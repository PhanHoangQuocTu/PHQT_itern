/* eslint-disable react/no-array-index-key */

'use client';

import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';

import styles from './TableCart.module.scss';

const TableCartProductItem = React.lazy(() =>
  import('../TableCartProductItem')
);

export default function TableCart() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const userData = Cookies.get('userData')
          ? JSON.parse(Cookies.get('userData'))
          : null;
        if (userData) {
          const headers = {
            Authorization: userData?.token,
          };
          const response = await axios.get(
            'https://gmen-admin.wii.camp/api/v1.0/carts/me',
            { headers }
          );
          if (response) {
            setProducts(response.data.body.products);
          }
        }
      } catch {
        return 0;
      }
      return null;
    };
    fetchProducts();
  }, []);

  const handleTotalChange = useCallback((changeAmount) => {
    setTotal((prevTotal) => prevTotal + changeAmount);
  }, []);

  return (
    <div className={`${styles.wrapper} mx-0`}>
      <div className={`${styles.heading} mx-0 row`}>
        <span className={`${styles.headingText} px-0 col font-poppins`}>
          Product
        </span>
        <span className={`${styles.headingText} px-0 col font-poppins`}>
          Size
        </span>
        <span className={`${styles.headingText} px-0 col font-poppins`}>
          Price
        </span>
        <span className={`${styles.headingText} px-0 col font-poppins`}>
          Quantity
        </span>
        <span className={`${styles.headingText} px-0 col font-poppins`}>
          Subtotal
        </span>
      </div>
      <div className={`${styles.list}`}>
        {products &&
          products.map((product, index) => {
            return (
              <TableCartProductItem
                key={index}
                id={product._id}
                img={product.product.cover}
                name={product.product.name}
                price={product.product.discountedPrice}
                size={product.size}
                quantity={product.quantity}
                onTotalChange={handleTotalChange}
              />
            );
          })}
      </div>
      <div className={`${styles.btnWrapper}`}>
        <button aria-label="btn" type="button" className={`${styles.btnTable}`}>
          <Link className={`${styles.btnTableLink} font-poppins`} href="/">
            Return To Shop
          </Link>
        </button>
        <button aria-label="btn" type="button" className={`${styles.btnTable}`}>
          <Link className={`${styles.btnTableLink} font-poppins`} href="/">
            Update Cart
          </Link>
        </button>
      </div>
      <div className={`${styles.checkout}`}>
        <div className={`${styles.coupon}`}>
          <input
            className={`${styles.couponInput}`}
            type="text"
            placeholder="Coupon Code"
          />
          <button
            aria-label="btn"
            type="button"
            className={`${styles.couponBtn} font-poppins`}
          >
            <span>Apply Coupon</span>
          </button>
        </div>
        <div className={`${styles.total} xs:min-w-[320px] sm:min-w-[470px]`}>
          <span className={`${styles.totalTitle} font-poppins`}>
            Cart Total
          </span>
          <div className={`${styles.totalBody}`}>
            <span className={`${styles.totalName} font-poppins`}>Subtotal</span>
            <span className={`${styles.totalPrice} font-poppins`}>
              ${total}
            </span>
          </div>
          <div className={`${styles.totalBody}`}>
            <span className={`${styles.totalName} font-poppins`}>Shipping</span>
            <span className={`${styles.totalPrice} font-poppins`}>Free</span>
          </div>
          <div className={`${styles.totalBody} border-b-[transparent]`}>
            <span className={`${styles.totalName} font-poppins`}>Total</span>
            <span className={`${styles.totalPrice} font-poppins`}>
              ${total}
            </span>
          </div>
          <button
            aria-label="btn"
            type="button"
            className={`${styles.totalBtn}`}
          >
            <Link
              href="/checkout"
              className={`${styles.totalBtnLink} font-poppins`}
            >
              Procees to checkout
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
