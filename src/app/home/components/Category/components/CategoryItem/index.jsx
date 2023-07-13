import React from 'react';
import PropTypes from 'prop-types';

import './CategoryItem.scss';

function CategoryItem({ children, category }) {
  return (
    <div className="category-item lg:max-w-[170px]">
      <div className="category-icon">{children}</div>
      <span className="category-name font-poppins">{category}</span>
    </div>
  );
}

CategoryItem.propTypes = {
  children: PropTypes.node.isRequired,
  category: PropTypes.string.isRequired,
};

export default React.memo(CategoryItem);
