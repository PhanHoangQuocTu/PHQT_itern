import React from 'react';
import classNames from 'classnames';

import EmailIcon from '@/svgs/Contact/icons-mail.svg';
import PhoneIcon from '@/svgs/Contact/icons-phone.svg';

import styles from './ContactPage.module.scss';

const Breadcrumb = React.lazy(() => import('@/components/Breadcrumb'));
const ContactForm = React.lazy(() => import('./components/ContactForm'));

export default function ContactPage() {
  return (
    <div className={classNames(styles.wrapper, 'container', 'px-0')}>
      <div className={classNames(styles.breadcrumb)}>
        <Breadcrumb />
      </div>
      <div className={classNames(styles.contact, 'font-poppins')}>
        <div className={classNames(styles.sidebar)}>
          <div className={classNames(styles.phoneBlock)}>
            <div className={classNames(styles.heading)}>
              <PhoneIcon className={classNames(styles.icon)} />
              <span className={classNames(styles.headingText)}>Call To Us</span>
            </div>
            <span className={classNames(styles.text, 'mt-[24px]')}>
              We are available 24/7, 7 days a week.
            </span>
            <span className={classNames(styles.text)}>
              Phone: +8801611112222
            </span>
          </div>
          <div className={classNames(styles.emailBlock)}>
            <div className={classNames(styles.heading)}>
              <EmailIcon className={classNames(styles.icon)} />
              <span className={classNames(styles.headingText)}>
                Write To US
              </span>
            </div>
            <span className={classNames(styles.text, 'mt-[24px]')}>
              Fill out our form and we will contact you within 24 hours.
            </span>
            <span className={classNames(styles.text)}>
              Emails: customer@exclusive.com
            </span>
            <span className={classNames(styles.text)}>
              Emails: support@exclusive.com
            </span>
          </div>
        </div>
        <div className={classNames(styles.form)}>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
