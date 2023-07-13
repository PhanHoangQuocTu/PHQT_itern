import React from 'react';
import PropTypes from 'prop-types';

export default function PublicLayout({ children }) {
  return <div>{children}</div>;
}

PublicLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
