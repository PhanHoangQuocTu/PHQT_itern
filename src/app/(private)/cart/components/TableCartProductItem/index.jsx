/* eslint-disable react/require-default-props */

'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie';
import Image from 'next/image';
import PropTypes from 'prop-types';

import DeleteIcon from '@/svgs/Cart/icon-delete.svg';

import styles from './TableCartProductItem.module.scss';

function TableCartProductItem({
  id,
  size = '',
  name,
  img,
  price,
  quantity,
  onTotalChange,
}) {
  const [user, setUser] = useState();
  const [total, setTotal] = useState(price * quantity);

  useEffect(() => {
    const account = Cookies.get('userData')
      ? JSON.parse(Cookies.get('userData'))
      : null;
    if (account) {
      setUser(account);
    }
  }, []);

  useEffect(() => {
    onTotalChange(price * quantity);
  }, [onTotalChange, price, quantity]);

  const handleDeleteApi = async (productId) => {
    try {
      if (user) {
        const headers = {
          Authorization: user?.token,
        };
        const response = axios.delete(
          `https://gmen-admin.wii.camp/api/v1.0/carts/me/product-items/${productId}`,
          { headers }
        );

        if (response) {
          toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      }
    } catch {
      return null;
    }
    return null;
  };

  const handleDeleteItem = () => {
    handleDeleteApi(id);
  };

  const handleQuantityChange = useCallback(
    (event) => {
      const updateProductQuantity = async (productId, newQuantity) => {
        try {
          if (user) {
            const payload = {
              quantity: newQuantity,
            };
            const headers = {
              Authorization: user?.token,
            };
            const response = await axios.put(
              `https://gmen-admin.wii.camp/api/v1.0/carts/me/product-items/${productId}`,
              payload,
              { headers }
            );

            if (response) {
              toast.success('Số lượng sản phẩm đã được cập nhật');
            }
          }
        } catch (error) {
          toast.error('Lỗi khi cập nhật số lượng sản phẩm:', error);
        }
      };

      const newQuantity = parseInt(event.target.value, 10);
      const newTotal = price * newQuantity;
      setTotal(newTotal);
      onTotalChange(newTotal - price * quantity);
      updateProductQuantity(id, newQuantity);
    },
    [id, onTotalChange, price, quantity, user]
  );

  return (
    <div className={`${styles.wrapper} row mx-0 mt-[40px]`}>
      <div className={`${styles.item} px-0 col font-poppins`}>
        <button aria-label="btn" type="button" onClick={handleDeleteItem}>
          <DeleteIcon className={styles.deleteIcon} />
        </button>
        <Image
          src={img}
          alt="product item"
          fill
          sizes="(max-width: 768px) 100vw"
          className="object-contain relative max-w-[50px] max-h-[39px]"
        />
        <span>{name}</span>
      </div>
      <div className={`${styles.item} px-0 col font-poppins`}>
        <span>{size !== null ? size : ''}</span>
      </div>
      <div className={`${styles.item} px-0 col font-poppins`}>
        <span>${price}</span>
      </div>
      <div
        className={`${styles.item} ${styles.inputWrapper} px-0 col font-poppins`}
      >
        <input
          type="number"
          min={1}
          max={99}
          defaultValue={quantity}
          onChange={handleQuantityChange}
        />
      </div>
      <div className={`${styles.item} px-0 col font-poppins`}>
        <span>${total}</span>
      </div>
    </div>
  );
}

TableCartProductItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  onTotalChange: PropTypes.func.isRequired,
  size: PropTypes.string,
};

export default React.memo(TableCartProductItem);
