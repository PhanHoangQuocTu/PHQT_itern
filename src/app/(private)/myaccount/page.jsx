import React from 'react';
import classNames from 'classnames';

const MyAccountBreadcrumb = React.lazy(() =>
  import('./components/MyAccountBreadcrumb')
);
const MyAccountForm = React.lazy(() => import('./components/MyAccountForm'));
const MyAccountSidebar = React.lazy(() =>
  import('./components/MyAccountSidebar')
);

export default function MyAccountPage() {
  return (
    <section className={classNames('w-full', 'container', 'px-0')}>
      <MyAccountBreadcrumb />
      <div
        className={classNames(
          'w-full',
          'mb-[140px]',
          'flex',
          'justify-between',
          'xl:flex-row',
          'xs:flex-col'
        )}
      >
        <MyAccountSidebar />
        <MyAccountForm />
      </div>
    </section>
  );
}
