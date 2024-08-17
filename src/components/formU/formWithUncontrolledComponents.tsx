import styles from './formWithUncontrolledComponents.module.css';
import { useRef, useState } from 'react';
import { formSchema } from '../../helpers/yupScema.ts';
import {redirect, useNavigate} from "react-router-dom";
import {ValidationError} from "yup";

export default function FormWithUncontrolledComponents() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form) return;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.terms = data.terms === 'true' ? 'true' : data.terms;
    console.log("formData: ", data)
    try {
      await formSchema.validate(data, { abortEarly: false });
      console.log("formData 2: ", data)
      navigate("/");
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
        <div className={styles.formGroup}>
          <label htmlFor="country">Country:</label>
          <select
            id="country"
            name="country"
            defaultValue=""
            onChange={handleClearError}>
            <option value="" disabled hidden>
              Select Country
            </option>
            <option value="Russia">Russia</option>
            <option value="Belorussia">Belorussia</option>
            <option value="Georgia">Georgia</option>
            <option value="Australia">Australia</option>
            <option value="Germany">Germany</option>
          </select>
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
