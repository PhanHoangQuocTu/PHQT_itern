import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import CopyrightIcon from '@/svgs/Footer/icon-copyright.svg';
import FacebookIcon from '@/svgs/Footer/Icon-Facebook.svg';
import InstagramIcon from '@/svgs/Footer/icon-instagram.svg';
import LinkedinIcon from '@/svgs/Footer/Icon-Linkedin.svg';
import SendIcon from '@/svgs/Footer/icon-send.svg';
import TwitterIcon from '@/svgs/Footer/Icon-Twitter.svg';

import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.main} container`}>
        <div className={`${styles.content}`}>
          <span className={`${styles.headingLg} font-inter`}>Exclusive</span>
          <ul className={`${styles.contentText} font-poppins`}>
            <li className={`${styles.contentTextItem} ${styles.subcribeItem}`}>
              <span
                className={`${styles.contentTextLink} ${styles.subcribeText} ${styles.noHover}`}
              >
                Subcribe
              </span>
            </li>
            <li className={`${styles.contentTextItem}`}>
              <span className={`${styles.contentTextLink} ${styles.noHover}`}>
                Get 10% off your first order
              </span>
            </li>
            <li
              className={`${styles.contentTextItem} ${styles.contentInputItem}`}
            >
              <input
                className={`${styles.contentInput}`}
                type="text"
                placeholder="Enter your email"
              />
              <SendIcon className={`${styles.sendIcon}`} />
            </li>
          </ul>
        </div>
        <div className={`${styles.content}`}>
          <span className={`${styles.heading} font-inter`}>Support</span>
          <ul className={`${styles.contentText} font-poppins`}>
            <li className={`${styles.contentTextItem}`}>
              <Link
                href="/"
                className={`${styles.contentTextLink} ${styles.noHover}`}
              >
                111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
              </Link>
            </li>
            <li className={`${styles.contentTextItem}`}>
              <Link
                href="/"
                className={`${styles.contentTextLink} ${styles.noHover}`}
              >
                exclusive@gmail.com
              </Link>
            </li>
            <li className={`${styles.contentTextItem}`}>
              <Link
                href="/"
                className={`${styles.contentTextLink} ${styles.noHover}`}
              >
                +88015-88888-9999
              </Link>
            </li>
          </ul>
        </div>
        <div className={`${styles.content}`}>
          <span className={`${styles.heading} font-inter`}>Account</span>
          <ul className={`${styles.contentText} font-poppins`}>
            <li className={`${styles.contentTextItem}`}>
              <Link href="/myaccount" className={`${styles.contentTextLink}`}>
                My Account
              </Link>
            </li>
            <li className={`${styles.contentTextItem}`}>
              <Link href="/signin" className={`${styles.contentTextLink}`}>
                Login / Register
              </Link>
            </li>
            <li className={`${styles.contentTextItem}`}>
              <Link href="/cart" className={`${styles.contentTextLink}`}>
                Cart
              </Link>
            </li>
            <li className={`${styles.contentTextItem}`}>
              <Link href="/wishlist" className={`${styles.contentTextLink}`}>
                Wishlist
              </Link>
            </li>
            <li className={`${styles.contentTextItem}`}>
              <Link href="/" className={`${styles.contentTextLink}`}>
                Shop
              </Link>
            </li>
          </ul>
        </div>
        <div className={`${styles.content}`}>
          <span className={`${styles.heading} font-inter`}>Quick Link</span>
          <ul className={`${styles.contentText} font-poppins`}>
            <li className={`${styles.contentTextItem}`}>
              <Link href="/" className={`${styles.contentTextLink}`}>
                Privacy Policy
              </Link>
            </li>
            <li className={`${styles.contentTextItem}`}>
              <Link href="/" className={`${styles.contentTextLink}`}>
                Terms Of Use
              </Link>
            </li>
            <li className={`${styles.contentTextItem}`}>
              <Link href="/" className={`${styles.contentTextLink}`}>
                FAQ
              </Link>
            </li>
            <li className={`${styles.contentTextItem}`}>
              <Link href="/contact" className={`${styles.contentTextLink}`}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className={`${styles.content}`}>
          <span className={`${styles.heading} font-inter`}>Download App</span>
          <ul className={`${styles.contentText}  font-poppins`}>
            <li className={`${styles.contentTextItem}`}>
              <Link href="/" className={`${styles.DownloadAppText}`}>
                Save $3 with App New User Only
              </Link>
            </li>
            <li className={`${styles.contentTextItem} mb-[24px]`}>
              <div className={`${styles.downloadAppImg}`}>
                <div className="w-[80px] h-[80px] relative">
                  <Image
                    src="/image/Footer/QrCode.png"
                    alt="QR CODE"
                    fill
                    sizes="(max-width: 768px) 100vw"
                  />
                </div>
                <div className={`${styles.downloadAppLink}`}>
                  <Link href="/" className="w-[104px] h-[40px] relative">
                    <Image
                      src="/image/Footer/GooglePlay.png"
                      alt="App Store"
                      fill
                      sizes="(max-width: 768px) 100vw"
                    />
                  </Link>
                  <Link href="/" className="w-[104px] h-[40px] relative">
                    <Image
                      src="/image/Footer/AppStore.png"
                      alt="App Store"
                      fill
                      sizes="(max-width: 768px) 100vw"
                    />
                  </Link>
                </div>
              </div>
            </li>
            <li
              className={`${styles.contentTextItem} flex gap-[24px] lg:justify-start md:justify-center sm:justify-center xs:justify-center`}
            >
              <Link
                aria-label="link social"
                href="/"
                className={`${styles.contentTextLink}`}
              >
                <FacebookIcon className={`${styles.contentIconSocial}`} />
              </Link>
              <Link
                aria-label="link social"
                href="/"
                className={`${styles.contentTextLink}`}
              >
                <TwitterIcon className={`${styles.contentIconSocial}`} />
              </Link>
              <Link
                aria-label="link social"
                href="/"
                className={`${styles.contentTextLink}`}
              >
                <InstagramIcon className={`${styles.contentIconSocial}`} />
              </Link>
              <Link
                aria-label="link social"
                href="/"
                className={`${styles.contentTextLink}`}
              >
                <LinkedinIcon className={`${styles.contentIconSocial}`} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={`${styles.copyright}`}>
        <CopyrightIcon className={`${styles.copyrightIcon}`} />
        <span className={`font-poppins ${styles.contentTextLink}`}>
          Copyright Rimel 2022. All right reserved
        </span>
      </div>
    </div>
  );
}
