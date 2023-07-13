/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';

import styles from './Breadcrumb.module.scss';

function Breadcrumb({ pathname = '', urls = '' }) {
  let pathnameVar = usePathname();
  if (pathname) {
    pathnameVar = pathname;
  }
  const pathNameArray = pathnameVar.split('/');
  pathNameArray.shift();
  const pathNameMainArray = pathNameArray.map((pathnameItem) => {
    return (
      pathnameItem.slice(0).charAt(0).toUpperCase() + pathnameItem.slice(1)
    );
  });
  return (
    <div className={`${styles.wrapper} font-poppins`}>
      <Link href="/" className={`${styles.link}`}>
        Home
      </Link>
      {pathNameMainArray.map((url, index) => {
        return (
          <Link key={index} href="/" className={`${styles.link}`}>
            {url}
          </Link>
        );
      })}
      {urls &&
        urls.map((url, index) => {
          return (
            <Link key={index} href="/" className={`${styles.link}`}>
              {url}
            </Link>
          );
        })}
    </div>
  );
}

Breadcrumb.propTypes = {
  pathname: PropTypes.string,
  urls: PropTypes.array,
};

export default React.memo(Breadcrumb);
