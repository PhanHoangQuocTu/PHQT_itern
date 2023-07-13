/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */

'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import classNames from 'classnames';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import DeliveryIcon from '@/svgs/DetailProduct/icon-delivery.svg';
import MinusIcon from '@/svgs/DetailProduct/icon-minus.svg';
import PlusIcon from '@/svgs/DetailProduct/icon-plus.svg';
import ReturnIcon from '@/svgs/DetailProduct/Icon-return.svg';
import StarNoActive from '@/svgs/DetailProduct/star.svg';
import StarActive from '@/svgs/DetailProduct/star-active.svg';
import WishlistIcon from '@/svgs/DetailProduct/Wishlist.svg';

import styles from './DetailProductItem.module.scss';

export default function ProductDetailItem() {
  const pathname = usePathname();
  const [quantity, setQuantity] = useState(1);
  const [colorSelected, setColorSeleted] = useState(1);
  const [product, setProduct] = useState();
  const [sizeSelected, setSizeSeleted] = useState(null);
  const [cart, setCart] = useState({});
  const router = useRouter();
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://gmen-admin.wii.camp/api/v1.0/products/${
            pathname.split('/')[2]
          }`
        );
        if (response) {
          setProduct(response.data.body);
          setSizeSeleted(response.data.body.variants[0].size);
        }
      } catch {
        return null;
      }
      return null;
    };

    fetchData();
  }, [pathname]);

  const handlePostApi = async (userToken, formData) => {
    const headers = {
      Authorization: userToken,
    };
    const response = await axios.post(
      'https://gmen-admin.wii.camp/api/v1.0/carts/me/products',
      formData,
      { headers }
    );
    if (response) {
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
    if (response) {
      toast.success('Thêm vào giỏ hàng thành công');
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  const handleAddToCart = async () => {
    try {
      const productId = product._id;
      const formData = {
        product: productId,
        quantity: 1,
        size: sizeSelected === null ? '' : sizeSelected,
      };
      if (user) {
        if (cart && cart.body && cart.body.products) {
          const existingProduct = cart.body.products.find((productCheck) => {
            return (
              productCheck.product._id === productId &&
              productCheck.size === sizeSelected
            );
          });
          if (existingProduct) {
            const formPutData = {
              quantity: existingProduct.quantity + quantity,
            };
            handlePutApi(user.token, formPutData, existingProduct._id);
          } else {
            handlePostApi(user.token, formData);
          }
        }
      } else {
        router.push('/signin');
      }
    } catch (error) {
      return null;
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  const handleDecreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  };
  return (
    <div className={classNames(styles.wrapper)}>
      <div className={classNames(styles.lineImg)}>
        {product?.images &&
          product.images.map((image) => {
            return (
              <div key={product._id} className={classNames(styles.lineItem)}>
                <Image
                  src={image}
                  alt="product line"
                  fill
                  sizes="(max-width: 768px) 100vw"
                  className="min-w-full h-full object-scale-down"
                />
              </div>
            );
          })}
      </div>
      {product && (
        <div className={classNames(styles.mainImg)}>
          <Image
            src={product.cover}
            alt="product line"
            fill
            sizes="(max-width: 768px) 100vw"
            className="min-w-full h-full object-scale-down"
          />
        </div>
      )}
      {product && (
        <div className={classNames(styles.infor)}>
          <span className={classNames(styles.name, 'font-inter')}>
            {product.name}
          </span>

          <div className={classNames(styles.rate)}>
            <div className={classNames(styles.starWrapper)}>
              <StarActive className={classNames(styles.star)} />
              <StarActive className={classNames(styles.star)} />
              <StarActive className={classNames(styles.star)} />
              <StarActive className={classNames(styles.star)} />
              <StarNoActive className={classNames(styles.star)} />
            </div>
            <span className={classNames(styles.count, 'font-poppins')}>
              (150 Reviews)
            </span>
            <span className={classNames(styles.stock, 'font-poppins')}>
              In Stock
            </span>
          </div>
          <span className={classNames(styles.price, 'font-inter')}>
            ${product.price}
          </span>
          <span className={classNames(styles.description, 'font-poppins')}>
            {product.description}
          </span>
          <div className={classNames(styles.colors)}>
            <span className={classNames(styles.colorsText, 'font-inter')}>
              Colours:
            </span>
            <div className={classNames(styles.listColors)}>
              <button
                aria-label="btn"
                type="button"
                onClick={() => setColorSeleted(1)}
                className={classNames('flex', {
                  [styles.colorSelected]: colorSelected === 1,
                })}
              >
                <span
                  className={classNames(styles.colorSelect, 'bg-[#A0BCE0]')}
                />
              </button>
              <button
                aria-label="btn"
                type="button"
                onClick={() => setColorSeleted(2)}
                className={classNames('flex', {
                  [styles.colorSelected]: colorSelected === 2,
                })}
              >
                <span
                  className={classNames(styles.colorSelect, 'bg-[#E07575]')}
                />
              </button>
            </div>
          </div>
          <div className={classNames(styles.size)}>
            <span className={classNames(styles.sizeText, 'font-inter')}>
              Size:
            </span>
            <div className={classNames(styles.listSize)}>
              {product.variants &&
                product.variants.map((variant) => {
                  if (variant.size !== null) {
                    return (
                      <button
                        key={variant._id}
                        aria-label="btn"
                        type="button"
                        onClick={() => {
                          setSizeSeleted(variant.size);
                        }}
                        className={classNames(
                          styles.sizeSelecet,
                          'font-poppins',
                          {
                            [styles.sizeActive]: sizeSelected === variant.size,
                          }
                        )}
                      >
                        {variant.size}
                      </button>
                    );
                  }
                })}
            </div>
          </div>
          <div className={classNames(styles.buy)}>
            <div className={classNames(styles.quantity)}>
              <button
                aria-label="btn"
                type="button"
                onClick={handleDecreaseQuantity}
              >
                <MinusIcon className={classNames(styles.minusIcon)} />
              </button>
              <input
                disabled
                type="text"
                value={quantity}
                className={classNames(styles.quantityInput)}
              />
              <button
                aria-label="btn"
                type="button"
                onClick={handleIncreaseQuantity}
              >
                <PlusIcon className={classNames(styles.plusIcon)} />
              </button>
            </div>
            <div className={classNames(styles.buyBtnWrapper)}>
              <button
                aria-label="btn"
                type="button"
                onClick={handleAddToCart}
                className={classNames(styles.buyBtn, 'font-poppins')}
              >
                Buy Now
              </button>
              <button
                aria-label="btn"
                type="button"
                className={classNames(styles.heartBtn)}
              >
                <WishlistIcon
                  className={classNames('w-[39px]', 'h-[39px]', 'p-[3px]')}
                />
              </button>
            </div>
          </div>
          <div className={classNames(styles.services, 'font-poppins')}>
            <div className={classNames(styles.servicesItem)}>
              <DeliveryIcon className={classNames(styles.servicesIcon)} />
              <div className={classNames(styles.servicesContentWrapper)}>
                <span className={classNames(styles.servicesTitle)}>
                  Free Delivery
                </span>
                <Link href="/" className={classNames(styles.servicesContent)}>
                  Enter your postal code for Delivery Availability
                </Link>
              </div>
            </div>
            <div className={classNames(styles.servicesItem)}>
              <ReturnIcon className={classNames(styles.servicesIcon)} />
              <div className={classNames(styles.servicesContentWrapper)}>
                <span className={classNames(styles.servicesTitle)}>
                  Return Delivery
                </span>
                <span
                  className={classNames(
                    'text-[12px]',
                    'leading-[18px]',
                    'font-medium',
                    'text-[#000]',
                    'mt-[8px]'
                  )}
                >
                  Free 30 Days Delivery Returns.
                  <Link href="/" className={classNames(styles.servicesContent)}>
                    Details
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
