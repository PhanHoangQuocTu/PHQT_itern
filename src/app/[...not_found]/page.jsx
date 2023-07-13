import dynamic from 'next/dynamic';

const NotFoundCatchAll = dynamic(
  () => import('next/navigation').then(({ notFound }) => notFound),
  {
    ssr: false, // Tắt server-side rendering cho module này
  }
);

export default NotFoundCatchAll;
