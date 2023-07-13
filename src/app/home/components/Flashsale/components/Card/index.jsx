/* eslint-disable no-prototype-builtins */
/* eslint-disable no-param-reassign */
/* eslint-disable react/forbid-prop-types */

'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import LazyLoad from 'react-lazyload';
import { toast } from 'react-toastify';
import axios from 'axios';
import classNames from 'classnames';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';

import HeartSmallIcon from '@/svgs/heart-small.svg';
import QuickViewIcon from '@/svgs/Quick-View.svg';
import StarIcon from '@/svgs/star.svg';

import './Card.scss';

function Card({
  id,
  img,
  typeDiscount,
  discount,
  sizes = null,
  name,
  sale,
  price,
  count,
  slug = null,
}) {
  const [user] = useState(() => {
    const currentUser = Cookies.get('userData')
      ? JSON.parse(Cookies.get('userData'))
      : null;
    return currentUser;
  });
  const { register, handleSubmit } = useForm();
  const [cart, setCart] = useState(null);
  const router = useRouter();

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
          if (response.data !== undefined) {
            setCart(response.data);
          }
        }
      } catch (error) {
        setCart(0);
      }
    };
    getCart();
  }, [user]);

  const handleAddToCart = async (data) => {
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
          window.location.reload();
        }, 1500);
      }
    };

    try {
      const productId = id;
      if (!data.size) {
        data.size = '';
      }
      const formData = {
        product: productId,
        quantity: 1,
        size: data.size,
      };

      if (user) {
        if (cart?.body?.products) {
          const existingProduct = cart.body.products.find((productCheck) =>
            productCheck.size
              ? productCheck.product._id === productId &&
                productCheck.size === data.size
              : productCheck.product._id === productId &&
                productCheck.size === null
          );

          if (existingProduct) {
            const formPutData = {
              quantity: existingProduct.quantity + 1,
            };
            await handlePutApi(user.token, formPutData, existingProduct._id);
          } else {
            await handlePostApi(user.token, formData);
          }
        }
      } else {
        toast.error('Bạn cần phải đăng nhập');
        setTimeout(() => {
          router.push('/signin');
        }, 1500);
      }
    } catch (error) {
      return null;
    }
    return null;
  };

  const handleAddToWishlist = () => {
    const productId = id;
    const existingWishlistItems = localStorage.getItem('wishlistItems');

    if (user) {
      if (!existingWishlistItems) {
        const wishlistItem = { [user.token]: [productId] };
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItem));
        toast.success('Thêm vào danh sách yêu thích thành công');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        const existingData = JSON.parse(existingWishlistItems);
        if (existingData.hasOwnProperty(user.token)) {
          if (existingData[user.token].includes(productId)) {
            toast.error('Sản phẩm đã tồn tại trong danh sách yêu thích');
          } else {
            existingData[user.token].push(productId);
            localStorage.setItem('wishlistItems', JSON.stringify(existingData));
            toast.success('Đã thêm sản phẩm vào danh sách yêu thích');
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }
        } else {
          existingData[user.token] = [productId];
          localStorage.setItem('wishlistItems', JSON.stringify(existingData));
          toast.success('Thêm vào danh sách yêu thích thành công');
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      }
    } else {
      toast.error('Bạn cần phải đăng nhập');
      setTimeout(() => {
        router.push('/signin');
      }, 1500);
    }
  };

  return (
    <div className="card-fs lg:max-w-[270px] font-poppins">
      <div className="image">
        <LazyLoad>
          <Image
            src={img}
            alt="product"
            fill
            className="lg:max-w-[270px]"
            sizes="(max-width: 768px) 100vw"
            priority
          />
        </LazyLoad>
        {typeDiscount === 'PERCENT' ? (
          <span className="card-discount">
            <p>-{discount}%</p>
          </span>
        ) : (
          <span className="card-discount">
            <p>-{discount}đ</p>
          </span>
        )}

        <div className="icon-wrapper">
          <button
            aria-label="btn"
            type="button"
            onClick={handleAddToWishlist}
            className="heart-small-icon"
          >
            <HeartSmallIcon className="card-icon" />
          </button>
          <Link
            href={`/product/${slug}`}
            aria-label="quick view"
            className="quick-view-icon"
          >
            <QuickViewIcon className="card-icon" />
          </Link>
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
                'w-[80%]'
              )}
              {...register('size')}
            >
              {sizes.map((size, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <option key={index} value={size}>
                  {size}
                </option>
              ))}
            </select>
          )}
          <button type="submit" aria-label="Add to cart" className="add-card">
            <span>Add To Cart</span>
          </button>
        </form>
      </div>
      <div className="description">
        <div className="name">
          <span>{name}</span>
        </div>

        <div className="description__wrapper">
          <div className="price">
            <span className="price-sale">${sale}</span>
            <span className="price-default">${price}</span>
          </div>

          <div className="rate">
            <div className="star-fs">
              <StarIcon className="star" />
              <StarIcon className="star" />
              <StarIcon className="star" />
              <StarIcon className="star" />
              <StarIcon className="star" />
            </div>
            <div className="count">
              (<span>{count}</span>)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  typeDiscount: PropTypes.string.isRequired,
  discount: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  sale: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  sizes: PropTypes.array.isRequired,
  slug: PropTypes.string.isRequired,
};

export default React.memo(Card);
