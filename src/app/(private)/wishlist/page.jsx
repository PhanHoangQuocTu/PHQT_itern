import React from 'react';

const Wishlist = React.lazy(() => import('./components/Wishlist'));
const WishlistForYou = React.lazy(() => import('./components/WishlistForYou'));

export default function WishlistPage() {
  return (
    <main className="w-full">
      <Wishlist />
      <WishlistForYou />
    </main>
  );
}
