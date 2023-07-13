/* eslint-disable no-prototype-builtins */

'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import classNames from 'classnames';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import CartIcon from '@/svgs/Header/Cart.svg';
import HeartIcon from '@/svgs/Header/Heart.svg';
import CancelIcon from '@/svgs/Header/icon-cancel.svg';
import LogoutIcon from '@/svgs/Header/Icon-logout.svg';
import MallbagIcon from '@/svgs/Header/icon-mallbag.svg';
import ReviewIcon from '@/svgs/Header/Icon-Reviews.svg';
import SearchIcon from '@/svgs/Header/SearchIcon.svg';
import UserIcon from '@/svgs/Header/user.svg';
import UserTooltipIcon from '@/svgs/Header/user-img.svg';

import 'react-toastify/dist/ReactToastify.css';
import './Header.scss';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cartItemNumber, setCartItemNumber] = useState(0);
  const [wishlistItemNumber, setWishlistItemNumber] = useState(0);
  const router = useRouter();

  const tooltipRef = useRef(null);

  useEffect(() => {
    const currentUser = Cookies.get('userData')
      ? JSON.parse(Cookies.get('userData'))
      : null;
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (user) {
          const headers = {
            Authorization: user?.token,
          };
          const response = await axios.get(
            'https://gmen-admin.wii.camp/api/v1.0/carts/me',
            { headers }
          );
          if (response) {
            setCartItemNumber(response.data.body.products.length);
          }
          return response.data;
        }
      } catch (error) {
        return error;
      }
      return null;
    };

    fetchCart();

    const currentWishlistItems = JSON.parse(
      localStorage.getItem('wishlistItems')
    );

    if (user && currentWishlistItems) {
      const accountToken = user.token;
      if (currentWishlistItems.hasOwnProperty(accountToken)) {
        const productList = currentWishlistItems[accountToken];
        setWishlistItemNumber(productList.length);
      }
    }
  }, [user, router]);

  const handleShowTooltip = useCallback(() => {
    setIsTooltipOpen((prevState) => !prevState);
  }, []);

  const handleLogout = useCallback(() => {
    Cookies.remove('userData');
    toast.success('Đăng xuất thành công');
    setTimeout(() => {
      router.push('/');
      window.location.reload();
    }, 1500);
  }, [router]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prevState) => !prevState);
  }, []);

  const handleCheckRoute = useCallback(
    (pathnameCheck) => {
      if (user === null) {
        toast.error('Bạn cần phải đăng nhập');
        setTimeout(() => {
          router.push('/signin');
        }, 1500);
      } else {
        router.push(`/${pathnameCheck}`);
      }
    },
    [router, user]
  );

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setIsTooltipOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [setIsTooltipOpen]);

  return (
    <header className="header">
      <ToastContainer />
      <div className="top-header">
        <div className="top-header-main container font-poppins">
          <div className="top-header__text">
            <span className="top-header__text-content">
              Summer Sale For All Swim Suits And Free Express Delivery - OFF
              50%!
            </span>
            <Link href="/" className="top-header__text-link">
              ShopNow
            </Link>
          </div>
          <div className="top-header__language ">
            <select className="language-switcher-select">
              <option value="en">English</option>
              <option value="vn">Vietnamese</option>
            </select>
          </div>
        </div>
      </div>
      <div className="main-header container">
        <div className="main-header__wrapper">
          <div className="main-header__brand">
            <span className="font-inter">Exclusive</span>
          </div>
          <button
            type="button"
            aria-label="Header"
            onClick={toggleMenu}
            className="fa-carat-icon"
          >
            <FontAwesomeIcon
              icon={isMenuOpen === true ? faCaretUp : faCaretDown}
            />
          </button>
          <ul
            className={classNames('main-header__menu', 'font-poppins', {
              show: isMenuOpen === true,
            })}
          >
            <li className="nav-item">
              <Link
                className={classNames('nav-link', 'main-header-link', {
                  active: pathname === '/',
                })}
                href="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={classNames('nav-link', 'main-header-link', {
                  active: pathname === '/contact',
                })}
                href="/contact"
              >
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={classNames('nav-link', 'main-header-link', {
                  active: pathname === '/about',
                })}
                href="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={classNames('nav-link', 'main-header-link', {
                  active: pathname === '/signup',
                })}
                href="/signup"
              >
                Sign up
              </Link>
            </li>
          </ul>

          <div
            className={classNames('main-header__actions', {
              show: isMenuOpen === true,
            })}
          >
            <div className="main-header__actions-search">
              <input placeholder="What are you looking for?" />
              <SearchIcon className="icon-search" />
            </div>
            <div className="main-header-icon__wrapper">
              {pathname !== '/signin' && pathname !== '/signup' && (
                <button
                  type="button"
                  aria-label="wishlist"
                  onClick={() => {
                    handleCheckRoute('wishlist');
                  }}
                  className="icon-heart"
                >
                  <HeartIcon className="icon-heart" />
                  {wishlistItemNumber > 0 && (
                    <span className="main-header-icon__count-product">
                      {wishlistItemNumber}
                    </span>
                  )}
                </button>
              )}
              {pathname !== '/signin' && pathname !== '/signup' && (
                <button
                  type="button"
                  aria-label="cart"
                  onClick={() => {
                    handleCheckRoute('cart');
                  }}
                  className="icon-cart"
                >
                  <CartIcon className="icon-cart" />
                  {cartItemNumber > 0 && (
                    <span className="main-header-icon__count-product">
                      {cartItemNumber}
                    </span>
                  )}
                </button>
              )}
              {user && (
                <div ref={tooltipRef} className="tooltip-user">
                  <UserIcon onClick={handleShowTooltip} className="user-icon" />
                  <div
                    className={classNames(
                      'tooltip-user__block',
                      'font-poppins',
                      {
                        'tooltip-show': isTooltipOpen === true,
                      }
                    )}
                  >
                    <Link href="/myaccount" className="tooltip-user__item">
                      <UserTooltipIcon className="tooltip-user__icon" />
                      <span>Manage My Account</span>
                    </Link>
                    <Link href="/" className="tooltip-user__item">
                      <MallbagIcon className="tooltip-user__icon" />
                      <span>My Order</span>
                    </Link>
                    <Link href="/" className="tooltip-user__item">
                      <CancelIcon className="tooltip-user__icon" />
                      <span>My Cancellations</span>
                    </Link>
                    <Link href="/" className="tooltip-user__item">
                      <ReviewIcon className="tooltip-user__icon" />
                      <span>My Reviews</span>
                    </Link>
                    <button
                      type="button"
                      aria-label="logout"
                      onClick={handleLogout}
                      className="tooltip-user__item"
                    >
                      <LogoutIcon className="tooltip-user__icon" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
