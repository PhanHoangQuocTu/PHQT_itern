import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import PropTypes from 'prop-types';

import InstagramIcon from '@/svgs/About/icon-instagram.svg';
import LinkedinIcon from '@/svgs/About/Icon-Linkedin.svg';
import TwitterIcon from '@/svgs/About/Icon-Twitter.svg';

import styles from './AboutMemberCard.module.scss';

function AboutMemberCard({ img, name, position }) {
  return (
    <div className={classNames(styles.wrapper)}>
      <div className={classNames(styles.image)}>
        <Image
          src={img}
          alt="member"
          fill
          sizes="(max-width: 768px) 100vw"
          className="object-contain"
        />
      </div>
      <div className={classNames(styles.infor)}>
        <span className={classNames(styles.name, 'font-inter')}>{name}</span>
        <span className={classNames(styles.position, 'font-poppins')}>
          {position}
        </span>
        <div className={classNames(styles.social)}>
          <TwitterIcon className={classNames(styles.icon)} />
          <InstagramIcon className={classNames(styles.icon)} />
          <LinkedinIcon className={classNames(styles.icon)} />
        </div>
      </div>
    </div>
  );
}

AboutMemberCard.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
};

export default React.memo(AboutMemberCard);
