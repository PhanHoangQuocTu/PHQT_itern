/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import * as Yup from 'yup';

import styles from './CheckOutForm.module.scss';

const InputForm = React.lazy(() => import('@/components/InputForm'));

const schema = Yup.object().shape({
  fname: Yup.string().required('Bạn cần phải nhập trường này'),
  company: Yup.string(),
  address: Yup.string().required('Bạn cần phải nhập trường này'),
  apartment: Yup.string(),
  city: Yup.string().required('Bạn cần phải nhập trường này'),
  phone: Yup.string()
    .required('Bạn cần phải nhập trường này')
    .matches(/^\d+$/, 'Số điện thoại không hợp lệ'),
  email: Yup.string()
    .email('Email không hợp lệ')
    .required('Bạn cần phải nhập trường này'),
});

export default function CheckOutForm() {
  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    return data;
  };

  return (
    <FormProvider {...methods}>
      <div className={classNames(styles.wrapper)}>
        <span className={classNames(styles.heading, 'font-inter')}>
          Billing Details
        </span>
        <form
          className={classNames(styles.form)}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={classNames(styles.item)}>
            <label
              className={classNames(styles.label, 'font-poppins')}
              htmlFor="fname"
            >
              First Name*
            </label>
            <InputForm
              id="fname"
              type="text"
              name="fname"
              className={`${styles.input}`}
            />
          </div>
          <div className={classNames(styles.item)}>
            <label
              className={classNames(styles.label, 'font-poppins')}
              htmlFor="company"
            >
              Company Name
            </label>
            <InputForm
              id="company"
              type="text"
              name="company"
              className={`${styles.input}`}
            />
          </div>
          <div className={classNames(styles.item)}>
            <label
              className={classNames(styles.label, 'font-poppins')}
              htmlFor="address"
            >
              Street Address*
            </label>
            <InputForm
              id="address"
              type="text"
              name="address"
              className={`${styles.input}`}
            />
          </div>
          <div className={classNames(styles.item)}>
            <label
              className={classNames(styles.label, 'font-poppins')}
              htmlFor="apartment"
            >
              Apartment, floor, etc. (optional)
            </label>
            <InputForm
              id="apartment"
              type="text"
              name="apartment"
              className={`${styles.input}`}
            />
          </div>
          <div className={classNames(styles.item)}>
            <label
              className={classNames(styles.label, 'font-poppins')}
              htmlFor="city"
            >
              Town/City*
            </label>
            <InputForm
              id="city"
              type="text"
              name="city"
              className={`${styles.input}`}
            />
          </div>
          <div className={classNames(styles.item)}>
            <label
              className={classNames(styles.label, 'font-poppins')}
              htmlFor="phone"
            >
              Phone Number*
            </label>
            <InputForm
              id="phone"
              type="text"
              name="phone"
              className={`${styles.input}`}
            />
          </div>
          <div className={classNames(styles.item)}>
            <label
              className={classNames(styles.label, 'font-poppins')}
              htmlFor="email"
            >
              Email Address*
            </label>
            <InputForm
              id="email"
              type="text"
              name="email"
              className={`${styles.input}`}
            />
          </div>
          <div className={classNames(styles.item, styles.checkboxItem)}>
            <InputForm
              type="checkbox"
              name="save"
              className={`${styles.checkbox}`}
            />
            <span className={classNames(styles.checkboxText, 'font=poppins')}>
              Save this information for faster check-out next time
            </span>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
