'use client';

import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';

import styles from './SignInForm.module.scss';

const InputForm = React.lazy(() => import('@/components/InputForm'));

export default function SignInForm() {
  const router = useRouter();
  useEffect(() => {
    Cookies.remove('userData');
  }, []);

  const validationSchema = yup.object().shape({
    phoneNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ')
      .required('Vui lòng nhập số điện thoại'),
    password: yup
      .string()
      .min(6, 'Mật khẩu phải chứa ít nhất 6 ký tự')
      .required('Vui lòng nhập mật khẩu'),
  });

  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleSignIn = async (formData) => {
    try {
      const response = await axios.post(
        'https://gmen-admin.wii.camp/api/v1.0/auth/login',
        formData
      );
      if (response) {
        const { token, fullName, _id } = response.data.body;
        const userData = {
          token,
          fullName,
          _id,
        };
        Cookies.set('userData', JSON.stringify(userData));
      }
      toast.success('Đăng nhập thành công');
      router.push('/');
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      toast.error('Lỗi ! Sai tài khoản hoặc mật khẩu');
    }
    return null;
  };

  const onSubmit = (data) => {
    handleSignIn(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        method="POST"
        className={`${styles.wrapper}`}
      >
        <InputForm
          type="text"
          name="phoneNumber"
          className={`${styles.signInFormInput}`}
          placeholder="Phone Number"
        />
        <InputForm
          type="password"
          name="password"
          className={`${styles.signInFormInput}`}
          placeholder="Password"
        />
        <div className={`${styles.SignInFormBtnWrapper}`}>
          <button
            aria-label="btn"
            className={`font-poppins ${styles.SignInFormSubmitBtn}`}
            type="submit"
          >
            Log In
          </button>
          <Link
            href="/signin"
            className={`${styles.SignInFormForgotPass} font-poppins`}
          >
            Forget Password?
          </Link>
        </div>
      </form>
    </FormProvider>
  );
}
