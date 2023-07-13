/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import classNames from 'classnames';
import Cookies from 'js-cookie';
import * as yup from 'yup';

import styles from './MyAccountForm.module.scss';

const InputForm = React.lazy(() => import('@/components/InputForm'));

const schema = yup.object().shape({
  fname: yup.string().required('First name is required'),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Invalid phone number')
    .required('Phone number is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  currentPassword: yup.string(),
  newPassword: yup.string(),
  birthday: yup.date().nullable(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
});

export default function MyAccountForm() {
  const [user, setUser] = useState();
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });
  const { setValue, handleSubmit } = methods;

  const updateInputValue = (fieldName, newValue) => {
    setValue(fieldName, newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = Cookies.get('userData')
          ? JSON.parse(Cookies.get('userData'))
          : null;
        if (currentUser) {
          const headers = {
            Authorization: currentUser.token,
          };
          const response = await axios.get(
            'https://gmen-admin.wii.camp/api/v1.0/users/me',
            { headers }
          );
          if (response) {
            return response.data;
          }
        }
      } catch (error) {
        return null;
      }
      return null;
    };

    const fetchUserData = async () => {
      const userData = await fetchData();
      if (userData) {
        setUser(userData);
        setValue('fname', userData.body ? userData.body.fullName : '');
        setValue('email', userData.body ? userData.body.email : '');
        setValue('phone', userData.body ? userData.body.phoneNumber : '');
        setValue('birthday', userData.body ? userData.body.birthday : '');
      }
    };

    fetchUserData();
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      if (
        data.currentPassword === '' &&
        data.newPassword === '' &&
        data.confirmPassword === ''
      ) {
        const formData = {
          fullName: data.fname,
          birthday: `${data.birthday.getFullYear()}-${
            data.birthday.getMonth() < 9
              ? `0${data.birthday.getMonth() + 1}`
              : data.birthday.getMonth() + 1
          }-${
            data.birthday.getDate() < 10
              ? `0${data.birthday.getDate()}`
              : data.birthday.getDate()
          }`,
        };
        if (user) {
          const headers = {
            Authorization: user?.token,
          };
          const response = await axios.put(
            'https://gmen-admin.wii.camp/api/v1.0/users/me',
            formData,
            { headers }
          );
          if (response) {
            toast.success('Cập nhật thành công');
          }
        }
      } else {
        const formData = {
          password: data.currentPassword,
          newPassword: data.newPassword,
          confirmPassword: data.confirmPassword,
        };
        if (user) {
          const headers = {
            Authorization: user?.token,
          };
          const response = await axios.put(
            'https://gmen-admin.wii.camp/api/v1.0/users/me/password',
            formData,
            { headers }
          );
          if (response) {
            toast.success('Đổi mật khẩu thành công');
          }
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
        className={classNames(styles.wrapper, 'font-poppins')}
      >
        <span className={classNames(styles.heading)}>Edit Your Profile</span>
        <div className={classNames(styles.inputWrapper)}>
          <div className={classNames(styles.item)}>
            <label htmlFor="fname" className={classNames(styles.label)}>
              First Name
            </label>
            <InputForm
              id="fname"
              name="fname"
              className={classNames(styles.input)}
              placeholder={user && user.name ? user.name.firstname : ''}
              defaultvalues={user && user.name ? user.name.firstname : ''}
              onChange={(event) =>
                updateInputValue('fname', event.target.value)
              }
            />
          </div>
          <div className={classNames(styles.item)}>
            <label htmlFor="phone" className={classNames(styles.label)}>
              Phone Number
            </label>
            <InputForm
              id="phone"
              name="phone"
              disabled
              className={classNames(styles.input, 'opacity-50')}
              placeholder={user && user.name ? user.name.lastname : ''}
              defaultvalues={user && user.name ? user.name.lastname : ''}
              onChange={(event) =>
                updateInputValue('phone', event.target.value)
              }
            />
          </div>
        </div>
        <div className={classNames(styles.inputWrapper)}>
          <div className={classNames(styles.item)}>
            <label htmlFor="email" className={classNames(styles.label)}>
              Email
            </label>
            <InputForm
              id="email"
              name="email"
              disabled
              className={classNames(styles.input, 'opacity-50')}
              placeholder={user ? user.email : ''}
              defaultvalues={user ? user.email : ''}
              onChange={(event) =>
                updateInputValue('email', event.target.value)
              }
            />
          </div>
          <div className={classNames(styles.item)}>
            <label htmlFor="birthday" className={classNames(styles.label)}>
              BirthDay
            </label>
            <InputForm
              type="date"
              id="birthday"
              name="birthday"
              className={classNames(styles.input)}
              placeholder={user && user.birthday ? user.birthday : ''}
              defaultvalues={user && user.birthday ? user.birthday : ''}
              onChange={(event) =>
                updateInputValue('birthday', event.target.value)
              }
            />
          </div>
        </div>
        <div className={classNames(styles.inputPassword)}>
          <label htmlFor="currentPassword" className={classNames(styles.label)}>
            Password Changes
          </label>
          <InputForm
            id="currentPassword"
            name="currentPassword"
            className={classNames(styles.input)}
            placeholder="Current Password"
          />
          <InputForm
            name="newPassword"
            className={classNames(styles.input)}
            placeholder="New Password"
          />
          <InputForm
            name="confirmPassword"
            className={classNames(styles.input, 'mb-[24px]')}
            placeholder="Confirm New Password"
          />
        </div>
        <div className={classNames(styles.btnWrapper)}>
          <button
            aria-label="btn"
            className={classNames(styles.btnCancel)}
            type="button"
          >
            Cancel
          </button>
          <button
            aria-label="btn"
            className={classNames(styles.btnSave)}
            type="submit"
          >
            Save Changes
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
