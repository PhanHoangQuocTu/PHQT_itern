/* eslint-disable prettier/prettier */

'use client';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import Cookies from 'js-cookie';

import styles from './MyAccountBreadcrumb.module.scss';

const Breadcrumb = React.lazy(() => import('@/components/Breadcrumb'));

export default function MyAccountBreadcrumb() {
  const [user, setUser] = useState();

  useEffect(() => {
    const userData = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;
    if (userData) {
      setUser(userData);
    }
  }, [])
  return (
    <div className={classNames(styles.breadcrumb)}>
      <Breadcrumb />
      <span className={classNames(styles.welcomeText, 'font-poppins')}>
        Welcome!{' '}
        <span
          className={classNames(
            styles.welcomeName,
            styles.welcomeText,
            'font-poppins'
          )}
        >
          {user && user.fullName}
        </span>
      </span>
    </div>
  );
}
