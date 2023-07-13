import React from 'react';
import Image from 'next/image';

import styles from './SignIn.module.scss';

const SignInForm = React.lazy(() => import('./components/SignInForm'));

export default function SignIn() {
  return (
    <section className={`${styles.wrapper}`}>
      <div className={`${styles.sideImg}`}>
        <Image
          src="/image/Auth/side-img.png"
          alt="side img"
          fill
          priority
          sizes="(max-width: 768px) 100vw"
        />
      </div>
      <div className={`${styles.signInForm}`}>
        <span className={`${styles.titleText} font-inter`}>
          Log in to Exclusive
        </span>
        <span className={`${styles.noticeText} font-poppins`}>
          Enter your details below
        </span>
        <SignInForm />
      </div>
    </section>
  );
}
