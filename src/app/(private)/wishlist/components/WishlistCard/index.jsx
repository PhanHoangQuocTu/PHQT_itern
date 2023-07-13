/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable no-param-reassign */
/* eslint-disable no-prototype-builtins */

'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import classNames from 'classnames';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';

import CartIcon from '@/svgs/Cart.svg';
import QuickViewIcon from '@/svgs/Quick-View.svg';
import DeleteIcon from '@/svgs/Wishlist/icon-delete.svg';

import styles from './WishlistCard.module.scss';

function WishlistCard({
  id,
  img,
  discount,
  type,
  name,
  price,
  sizes = null,
  slug = null,
}) {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [cart, setCart] = useState({});
  const [user, setUser] = useState();

  useEffect(() => {
    const userData = Cookies.get('userData')
      ? JSON.parse(Cookies.get('userData'))
      : null;
    if (userData) {
      setUser(userData);
    }
  }, []);

  useEffect(() => {
    const getCart = async () => {
      try {
        if (user) {
          const headers = {
            Authorization: user?.token,
          };
          const response = await axios.get(
            'https://gmen-admin.wii.camp/api/v1.0/carts/me',
            { headers }
          );
          if (response !== undefined) {
            setCart(response.data);
          }
        }
        return null;
      } catch {
        return 0;
      }
    };
    getCart();
  }, [user]);

  const handleAddToCart = useCallback(
    async (data) => {
      const handlePostApi = async (userToken, formData) => {
        const headers = {
          Authorization: userToken,
        };
        const response = await axios.post(
          'https://gmen-admin.wii.camp/api/v1.0/carts/me/products',
          formData,
          { headers }
        );
        if (response.data) {
          toast.success('Thêm vào giỏ hàng thành công');
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      };

      const handlePutApi = async (userToken, formData, ProductId) => {
        const headers = {
          Authorization: userToken,
        };
        const response = await axios.put(
          `https://gmen-admin.wii.camp/api/v1.0/carts/me/product-items/${ProductId}`,
          formData,
          { headers }
        );
        if (response.data) {
          toast.success('Thêm vào giỏ hàng thành công');
          setTimeout(() => {
            router.refresh();
          }, 1500);
        }
      };
      try {
        const productId = id;
        if (data.size === undefined) {
          data.size = '';
        }
        const formData = {
          product: productId,
          quantity: 1,
          size: data.size,
        };
        if (user) {
          if (cart) {
            if (cart.body) {
              if (cart.body.products) {
                const existingProduct = cart.body.products.find(
                  (productCheck) => {
                    return (
                      (productCheck.product._id === productId &&
                        productCheck.size === data.size) ||
                      (productCheck.product._id === productId &&
                        productCheck.size === null)
                    );
                  }
                );
                if (existingProduct) {
                  const formPutData = {
                    quantity: existingProduct.quantity + 1,
                  };
                  handlePutApi(user.token, formPutData, existingProduct._id);
                } else {
                  handlePostApi(user.token, formData);
                }
              }
            }
          }
        } else {
          router.push('/signin');
        }
      } catch (error) {
        return null;
      }
      return null;
    },
    [cart, id, router, user]
  );

  const handleDeleteItem = () => {
    const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems'));
    const productIdSelected = id;
    if (user) {
      const accountToken = user.token;
      const updatedWishlistItems = { ...wishlistItems };
      if (updatedWishlistItems.hasOwnProperty(accountToken)) {
        const productId = updatedWishlistItems[accountToken];

        const updatedProductId = productId.filter(
          (item) => item !== productIdSelected
        );

        updatedWishlistItems[accountToken] = updatedProductId;

        localStorage.setItem(
          'wishlistItems',
          JSON.stringify(updatedWishlistItems)
        );
        toast.success('Đã xóa thành công');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    }
  };

  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.imageWrapper}`}>
        <Image
          sizes="(max-width: 1200px) 100vw"
          src={img}
          alt="wishlist product"
          fill
          priority
        />
        <div className={`${styles.discountAndActions}`}>
          {discount && (
            <span className={`${styles.discount} font-poppins`}>
              -{discount}%
            </span>
          )}
          {type && (
            <div className={`${styles.cardIconWrapper}`}>
              {type === 'wishlist' && (
                <button
                  aria-label="btn"
                  type="button"
                  onClick={handleDeleteItem}
                >
                  <DeleteIcon className={`${styles.deleteIcon}`} />
                </button>
              )}
              {type === 'foryou' && (
                <Link href={`/product/${slug}`}>
                  <QuickViewIcon className={`${styles.quickViewIcon}`} />
                </Link>
              )}
            </div>
          )}
        </div>
        <form
          className={classNames(
            'absolute',
            'flex',
            'flex-col',
            'items-center',
            'bottom-0',
            'w-full'
          )}
          onSubmit={handleSubmit(handleAddToCart)}
        >
          {sizes && sizes[0] !== null && (
            <select
              className={classNames(
                'relative',
                'text-[28px]',
                'h-[36px]',
                'shadow-sm',
                'w-[80%]',
                'mb-[42px]'
              )}
              {...register('size')}
            >
              {sizes.map((size, index) => {
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <option key={index} value={`${size}`}>
                    {size}
                  </option>
                );
              })}
            </select>
          )}

          <button
            type="submit"
            aria-label="btn submit"
            className={`${styles.addCart}`}
          >
            <CartIcon className={`${styles.cartIcon}`} />
            <span className={`${styles.addCartText} font-poppins`}>
              Add To Cart
            </span>
          </button>
        </form>
      </div>
      <div className={`${styles.information}`}>
        {name && <span className={`${styles.name} font-poppins`}>{name}</span>}
        {price && (
          <div className={styles.priceWrapper}>
            {discount && (
              <span className={`${styles.discountPrice} font-poppins`}>
                ${(price * ((100 - discount) / 100)).toFixed(3)}
              </span>
            )}
            {price && (
              <span
                className={classNames(styles.price, 'font-poppins', {
                  [styles.priceLine]: discount != null,
                })}
              >
                ${price}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

WishlistCard.propTypes = {
  id: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  discount: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  sizes: PropTypes.array,
  slug: PropTypes.string.isRequired,
};

export default React.memo(WishlistCard);
