import {object, string, date, ref} from 'yup';

export const FormLoginSchema = object().shape({
  email: string()
    .email('Please input valid email')
    .required('Email is required'),
  password: string().required('Password is required'),
});

export const FormRegisterchema = object().shape({
  email: string()
    .email('Please input valid email')
    .required('Email is required'),
  password: string().required('Password is required'),
  dob: date().required('Date of Birth is required'),
});

export const FormForgotPasswordSchema = object().shape({
  email: string()
    .email('Please input valid email')
    .required('Email is required'),
});

export const FormChangePasswordSchema = object().shape({
  password: string().required('Password tidak boleh kosong'),
  confirmPassword: string()
    .when('password', {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: string().oneOf([ref('password')], 'Konfirmasi Password tidak sama'),
    })
    .required('Konfirmasi Password tidak boleh kosong'),
});
