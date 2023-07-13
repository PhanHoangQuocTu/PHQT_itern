'use client';

import React from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';

export default function AuthLayout({ children }) {
  const router = useRouter();
  if (typeof window !== 'undefined') {
    const currentUser = Cookies.get('userData')
      ? JSON.parse(Cookies.get('userData'))
      : null;
    if (currentUser !== null) {
      router.push('/');
    }
    return <div>{children}</div>;
  }
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
