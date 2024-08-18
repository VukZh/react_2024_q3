import * as yup from 'yup';

export const formSchemaRHF = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z]/, 'Name must start with an uppercase letter'),
  age: yup
    .number()
    .required('Age is required')
    .positive('Age must be a positive number')
    .integer('Age must be an integer'),
  email: yup
    .string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /(?=.*[a-z])/,
      'Password must contain at least one lowercase letter',
    )
    .matches(
      /(?=.*[A-Z])/,
      'Password must contain at least one uppercase letter',
    )
    .matches(/(?=.*[0-9])/, 'Password must contain at least one number')
    .matches(
      /(?=.*[!@#$%^&*_-~])/,
      'Password must contain at least one special character',
    ),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  gender: yup.string().required('Gender is required'),
  country: yup.string().required('Country is required'),
  picture: yup
    .mixed()
    .required('A file is required')
    .test(
      'fileType',
      'Only PNG and JPEG files are allowed',
      (value: Array<{ type }>) => {
        if (!value?.length) return false;
        return ['image/png', 'image/jpeg'].includes(value[0].type);
      },
    )
    .test(
      'fileSize',
      'File size must be less than 1MB',
      (value: Array<{ size }>) => {
        if (!value?.length) return false;
        return value[0].size <= 1024 * 1024;
      },
    ),
  terms: yup
    .boolean()
    .oneOf([true], 'You must accept the Terms and Conditions'),
});
