import styles from './formWithReactHookForm.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { formSchemaRHF } from '../../helpers/yupScemaRHF.ts';
import { useFormRHF } from '../../hooks/useFormRHF.tsx';
import { fileToBase64 } from '../../helpers/fileToBase64.ts';

export default function FormWithReactHookForm() {
  const navigate = useNavigate();
  const { formDataRHF, handleSetFormRHF } = useFormRHF();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchemaRHF),
  });

  console.log(errors);

  const hasError = Object.keys(errors).length > 0;

  const onSubmit = async (data) => {
    console.log(data);
    const pictureBase64 = await fileToBase64(data.picture[0] as File);
    console.log('...', pictureBase64);
    const dataUpdates = {
      name: data.name,
      age: data.age,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      gender: data.gender,
      country: data.country,
      picture: pictureBase64,
      terms: data.terms,
    };

    console.log(dataUpdates);
    handleSetFormRHF(dataUpdates);
    navigate('/');
  };

  return (
    <div className={styles.formContainer}>
      <h2>Form with React Hook Form</h2>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" {...register('name')} />
          {errors.name && (
            <span className={styles.error}>{errors.name.message}</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            defaultValue={0}
            {...register('age', { valueAsNumber: true })}
          />
          {errors.age && (
            <span className={styles.error}>{errors.age.message}</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" {...register('email')} />
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            autoComplete="new-password"
            {...register('password')}
          />
          {errors.password && (
            <span className={styles.error}>{errors.password.message}</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <span className={styles.error}>
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="gender">Gender:</label>
          <select id="gender" {...register('gender')}>
            <option value="" disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && (
            <span className={styles.error}>{errors.gender.message}</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="country">Country:</label>
          <select id="country" {...register('country')}>
            <option value="" disabled>
              Select Country
            </option>
            <option value="Russia">Russia</option>
            <option value="Belarus">Belorussia</option>
            <option value="Georgia">Georgia</option>
            <option value="Australia">Australia</option>
            <option value="Germany">Germany</option>
          </select>
          {errors.country && (
            <span className={styles.error}>{errors.country.message}</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="picture">Upload Picture:</label>
          <input
            type="file"
            id="picture"
            accept="image/png, image/jpeg"
            {...register('picture')}
          />
          {errors.picture && (
            <span className={styles.error}>{errors.picture.message}</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <input type="checkbox" id="terms" {...register('terms')} />
          <label htmlFor="terms">I accept the Terms and Conditions</label>
          {errors.terms && (
            <span className={styles.error}>{errors.terms.message}</span>
          )}
        </div>
        <button
          type="submit"
          disabled={hasError}
          className={hasError ? styles.btnInactive : ''}>
          Submit
        </button>
      </form>
    </div>
  );
}
