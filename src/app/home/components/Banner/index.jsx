/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';

const SidebarBanner = React.lazy(() => import('./components/Sidebar'));
const SwiperSlider = React.lazy(() => import('./components/SwiperSlider'));

export default function Banner({ data, categories }) {
  return (
    <div className="banner-wrapper">
      <div className="container flex xs:flex-col xl:flex-row px-0">
        <SidebarBanner data={categories} />
        <SwiperSlider data={data} />
      </div>
    </div>
  );
}

Banner.propTypes = {
  data: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
};
