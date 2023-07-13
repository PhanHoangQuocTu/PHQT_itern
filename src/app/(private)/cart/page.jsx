import React from 'react';

const Breadcrumb = React.lazy(() => import('@/components/Breadcrumb'));
const TableCart = React.lazy(() => import('./components/TableCart'));

export default function CartPage() {
  return (
    <section className="w-full container px-0">
      <div className="my-[80px]">
        <Breadcrumb />
      </div>
      <div className="bg-[#fff] rounded-[4px]">
        <TableCart />
      </div>
    </section>
  );
}
