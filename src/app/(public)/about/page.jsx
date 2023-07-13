import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';

import ShopIcon from '@/svgs/About/icon_shop.svg';
import MoneyBagIcon from '@/svgs/About/Icon-Moneybag.svg';
import SaleIcon from '@/svgs/About/Icon-Sale.svg';
import ShoppingIcon from '@/svgs/About/Icon-Shopping.svg';
import CustomerServiceIcon from '@/svgs/Featured/Icon-Customer-service.svg';
import DeliveryIcon from '@/svgs/Featured/icon-delivery.svg';
import SecureIcon from '@/svgs/Featured/Icon-secure.svg';

import styles from './AboutPage.module.scss';

const Breadcrumb = React.lazy(() => import('@/components/Breadcrumb'));

const AboutSlider = React.lazy(() => import('./components/AboutSlider'));
const DetailItem = React.lazy(() => import('./components/DetailItem'));
const ServiceItem = React.lazy(() => import('./components/ServiceItem'));

export default function AboutPage() {
  return (
    <section className={classNames(styles.wrapper, 'font-poppins')}>
      <div className={classNames(styles.breadcrumb, 'container', 'px-0')}>
        <Breadcrumb />
      </div>
      <div className={classNames(styles.story)}>
        <div className={classNames(styles.paragraph)}>
          <span className={classNames(styles.heading, 'font-inter')}>
            Our Story
          </span>
          <span className={classNames(styles.text)}>
            Launced in 2015, Exclusive is South Asia’s premier online shopping
            makterplace with an active presense in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sallers and 300 brands and serves 3 millioons customers
            across the region.
          </span>
          <span className={classNames(styles.text, 'mt-[24px]')}>
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assotment in categories
            ranging from consumer.
          </span>
        </div>
        <div className={classNames(styles.storyImg)}>
          <Image
            src="/image/About/About-img.png"
            alt="about"
            fill
            sizes="(max-width: 768px) 100vw"
            className="max-h-[609px] w-full h-full"
          />
        </div>
      </div>
      <div
        className={classNames(styles.detail, 'gap-[30px]', 'container', 'px-0')}
      >
        <DetailItem
          icon={ShopIcon}
          count={10.5}
          text="Sallers active our site"
        />
        <DetailItem
          icon={SaleIcon}
          count={33.0}
          text="Mopnthly Produduct Sale"
        />
        <DetailItem
          icon={ShoppingIcon}
          count={45.5}
          text="Customer active in our site"
        />
        <DetailItem
          icon={MoneyBagIcon}
          count="25k"
          text="Anual gross sale in our site"
        />
      </div>
      <div className={classNames(styles.member, 'container', 'px-0')}>
        <AboutSlider />
      </div>
      <div className={classNames(styles.service)}>
        <ServiceItem
          name="FREE AND FAST DELIVERY"
          description="Free delivery for all orders over $140"
        >
          <div className={classNames(styles.serviceIconWrapper)}>
            <DeliveryIcon className={classNames(styles.serviceIcon)} />
          </div>
        </ServiceItem>
        <ServiceItem
          name="24/7 CUSTOMER SERVICE"
          description="Friendly 24/7 customer support"
        >
          <div className={classNames(styles.serviceIconWrapper)}>
            <CustomerServiceIcon className={classNames(styles.serviceIcon)} />
          </div>
        </ServiceItem>
        <ServiceItem
          name="MONEY BACK GUARANTEE"
          description="We return money within 30 days"
        >
          <div className={classNames(styles.serviceIconWrapper)}>
            <SecureIcon className={classNames(styles.serviceIcon)} />
          </div>
        </ServiceItem>
      </div>
    </section>
  );
}
