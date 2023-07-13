'use client';

import React, { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';

import GoogleIcon from '@/svgs/Signup/Icon-Google.svg';

import styles from './SignUpForm.module.scss';

const InputForm = React.lazy(() => import('@/components/InputForm'));

export default function SignUpForm() {
  const validationSchema = yup.object().shape({
    fullName: yup.string().required('Vui lòng nhập tên'),
    email: yup
      .string()
      .email('Email không hợp lệ')
      .required('Vui lòng nhập email'),
    password: yup
      .string()
      .min(6, 'Mật khẩu phải chứa ít nhất 6 ký tự')
      .required('Vui lòng nhập mật khẩu'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp')
      .required('Vui lòng xác nhận mật khẩu'),
    phoneNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ')
      .required('Vui lòng nhập số điện thoại'),
    birthday: yup.date(),
  });

  const router = useRouter();
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = useCallback(
    (data) => {
      const handleSignUp = async (formData) => {
        try {
          const response = await axios.post(
            'https://gmen-admin.wii.camp/api/v1.0/auth/register',
            formData
          );
          toast.success('Đăng ký thành công');
          setTimeout(() => {
            router.push('/signin');
          }, 1500);
          return response.data;
        } catch (error) {
          toast.error('Lỗi ! Email hoặc số điện thoại đã tồn tại !');
        }
        return null;
      };
      const formData = data;
      const { birthday } = data;
      const birthdayData = `${birthday.getFullYear()}-${
        birthday.getMonth() < 9
          ? `0${birthday.getMonth()}`
          : birthday.getMonth() + 1
      }-${birthday.getDate()}`;
      formData.birthday = birthdayData;
      handleSignUp(formData);
      return data;
    },
    [router]
  );

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        method="POST"
        className={`${styles.wrapper}`}
      >
        <InputForm
          type="text"
          name="fullName"
          className={`${styles.signUpFormInput}`}
          placeholder="full name"
        />
        <InputForm
          type="text"
          name="email"
          className={`${styles.signUpFormInput}`}
          placeholder="Email"
        />
        <InputForm
          type="text"
          name="phoneNumber"
          className={`${styles.signUpFormInput}`}
          placeholder="Phone Number"
        />
        <InputForm
          type="password"
          name="password"
          className={`${styles.signUpFormInput}`}
          placeholder="Password"
        />
        <InputForm
          type="password"
          name="confirmPassword"
          className={`${styles.signUpFormInput}`}
          placeholder="Confirm password"
        />
        <InputForm
          type="date"
          name="birthday"
          className={`${styles.signUpFormInput}`}
          placeholder="Birthday"
        />

        <button
          aria-label="btn"
          className={`font-poppins ${styles.SignUpFormSubmitBtn}`}
          type="submit"
        >
          Create Account
        </button>
        <button
          aria-label="btn"
          className={`${styles.SignUpFormGoogleBtn}`}
          type="button"
        >
          <GoogleIcon className={`${styles.googleIcon}`} />
          <span className={`${styles.googleBtnText} font-poppins`}>
            Sign up with Google
          </span>
        </button>
        <div className={`${styles.haveAccount}`}>
          <span className={`${styles.haveAccountText} font-poppins`}>
            Already have account?
          </span>
          <Link
            href="/signin"
            className={`${styles.haveAccountLink} font-poppins`}
          >
            Log in
          </Link>
        </div>
      </form>
    </FormProvider>
  );
}
