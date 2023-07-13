'use client';

import React, { useEffect, useRef, useState } from 'react';
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import styles from './MyAccountSidebar.module.scss';

export default function MyAccountSidebar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef(null);

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setShowSidebar(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className={classNames(styles.wrapper)}>
      <button aria-label="btn" type="button" onClick={toggleSidebar}>
        <FontAwesomeIcon
          icon={faBars}
          className={classNames(styles.barsIcon)}
        />
      </button>
      <div
        className={classNames(styles.sidebar, {
          [styles.showSidebar]: showSidebar,
        })}
        ref={sidebarRef}
      >
        {showSidebar === true && (
          <button
            aria-label="btn"
            type="button"
            onClick={toggleSidebar}
            className={classNames(
              'flex',
              'justify-end',
              'pr-[12px]',
              'mb-[12px]'
            )}
          >
            <FontAwesomeIcon
              icon={faClose}
              className={classNames(styles.closeIcon)}
            />
          </button>
        )}
        <div className={classNames(styles.item)}>
          <span className={classNames(styles.heading, 'font-poppins')}>
            Manage My Account
          </span>
          <div className={classNames(styles.menu)}>
            <span
              className={classNames(
                styles.menuItem,
                'font-poppins',
                styles.active
              )}
            >
              My Profile
            </span>
            <span className={classNames(styles.menuItem, 'font-poppins')}>
              Address Book
            </span>
            <span
              className={classNames(
                styles.menuItem,
                'font-poppins',
                'mb-[24px]'
              )}
            >
              My Payment Options
            </span>
          </div>
        </div>
        <div className={classNames(styles.item)}>
          <span className={classNames(styles.heading, 'font-poppins')}>
            My Orders
          </span>
          <div className={classNames(styles.menu)}>
            <span className={classNames(styles.menuItem, 'font-poppins')}>
              My Returns
            </span>
            <span
              className={classNames(
                styles.menuItem,
                'font-poppins',
                'mb-[16px]'
              )}
            >
              My Cancellations
            </span>
          </div>
        </div>
        <div className={classNames(styles.item)}>
          <span className={classNames(styles.heading, 'font-poppins')}>
            My WishList
          </span>
        </div>
      </div>
    </div>
  );
}
