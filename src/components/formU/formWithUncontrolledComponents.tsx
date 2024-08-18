import styles from './formWithUncontrolledComponents.module.css';
import { useState } from 'react';
import { formSchema } from '../../helpers/yupScema.ts';
import { useNavigate } from 'react-router-dom';
import { ValidationError } from 'yup';
import { FormDataType } from '../../types/types.ts';
import { fileToBase64 } from '../../helpers/fileToBase64.ts';
import { useFormU } from '../../hooks/useFormU.tsx';
import AutocompleteU from '../autocomplete/autocompleteU.tsx';

export default function FormWithUncontrolledComponents() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { formDataU, handleSetFormU, countries } = useFormU();

  const countriesOptions = countries.map((c) => ({
    label: c,
    value: c,
  }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form) return;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.terms = data.terms === 'true' ? 'true' : data.terms;

    try {
      await formSchema.validate(data, { abortEarly: false });
      const pictureBase64 = await fileToBase64(data.picture as File);

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
      handleSetFormU(dataUpdates as FormDataType);
      navigate('/');
    } catch (err: ValidationError) {
      const validationErrors: Record<string, string> = {};
      err.inner.forEach((error: ValidationError) => {
        if (error.path) {
          validationErrors[error.path] = error.message;
        }
      });
      setErrors(validationErrors);
    }
  };

  const handleClearError = () => {
    setErrors({});
  };

  const hasError = Object.keys(errors).length > 0;

  return (
    <div className={styles.formContainer}>
      <h2>Form with Uncontrolled Components</h2>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleClearError}
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            step={1}
            defaultValue={0}
            onChange={handleClearError}
          />
          {errors.age && <span className={styles.error}>{errors.age}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleClearError}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="new-password"
            onChange={handleClearError}
          />
          {errors.password && (
            <span className={styles.error}>{errors.password}</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            onChange={handleClearError}
          />
          {errors.confirmPassword && (
            <span className={styles.error}>{errors.confirmPassword}</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            defaultValue=""
            onChange={handleClearError}>
            <option value="" disabled hidden>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && (
            <span className={styles.error}>{errors.gender}</span>
          )}
        </div>
        <div
          className={styles.formGroup}
          style={{ zIndex: '1' }}
          onClick={handleClearError}>
          <AutocompleteU options={countriesOptions} name="country" />
          {errors.country && (
            <span className={styles.error}>{errors.country}</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="picture">Upload Picture:</label>
          <input
            type="file"
            id="picture"
            name="picture"
            accept="image/png, image/jpeg"
            onChange={handleClearError}
          />
          {errors.picture && (
            <span className={styles.error}>{errors.picture}</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <input
            type="checkbox"
            id="terms"
            name="terms"
            onChange={handleClearError}
            value="true"
          />
          <label htmlFor="terms">I accept the Terms and Conditions</label>
          {errors.terms && <span className={styles.error}>{errors.terms}</span>}
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
