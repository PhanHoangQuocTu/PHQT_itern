import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';

const Breadcrumb = React.lazy(() => import('@/components/Breadcrumb'));

export default function NotFound() {
  return (
    <div className={classNames('container', 'px-0')}>
      <div className={classNames('mt-[80px]')}>
        <Breadcrumb pathname="/404 Error" />
      </div>
      <div
        className={classNames(
          'w-full',
          'min-h-[595px]',
          'flex',
          'flex-col',
          'justify-center',
          'items-center'
        )}
      >
        <span
          className={classNames(
            'lg:text-[110px]',
            'lg:leading-[115px]',
            'sm:text-[64px]',
            'sm:leading-[68px]',
            'xs:text-[36px] ',
            'xs:leading-[40px]',
            'font-medium',
            'font-inter',
            'tracking-[3.3px]',
            'text-center'
          )}
        >
          404 Not Found
        </span>
        <span
          className={classNames(
            'mt-[40px]',
            'sm:text-[16px]',
            'sm:leading-[24px]',
            'xs:text-[12px]',
            'xs:leading-[20px]',
            'font-normal',
            'font-poppins',
            'text-center'
          )}
        >
          Your visited page not found. You may go home page.
        </span>
        <Link
          href="/"
          className={classNames(
            'px-[48px]',
            'py-[16px]',
            'rounded-[4px]',
            'bg-[#db4444]',
            'mt-[80px]',
            'font-poppins',
            'text-[16px]',
            'leading-[24px]',
            'font-medium',
            'text-[#FAFAFA]',
            'no-underline',
            'hover:opacity-70'
          )}
        >
          Back to home page
        </Link>
      </div>
    </div>
  );
}
