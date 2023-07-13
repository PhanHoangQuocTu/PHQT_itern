import React from 'react';
import classNames from 'classnames';

const Breadcrumb = React.lazy(() => import('@/components/Breadcrumb'));
const CheckOutForm = React.lazy(() => import('./components/CheckOutForm'));
const CheckOutTable = React.lazy(() => import('./components/ChecOutTable'));

export default function CheckOutPage() {
  return (
    <section className={classNames('container', 'px-0')}>
      <div className={classNames('my-[80px]')}>
        <Breadcrumb urls={['My Account', 'Product', 'View Cart']} />
      </div>
      <div
        className={classNames(
          'flex',
          'mb-[140px]',
          'lg:flex-row',
          'lg:justify-between',
          'lg:gap-0',
          'xs:flex-col',
          'xs:justify-center',
          'xs:gap-[40px]'
        )}
      >
        <CheckOutForm />
        <CheckOutTable />
      </div>
    </section>
  );
}
