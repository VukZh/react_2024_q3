import styles from './formWithReactHookForm.module.css';

export default function FormWithReactHookForm() {
  return (
    <div className={styles.formContainer}>
      <h2>Form with react hook form</h2>
      <form autoComplete="off">
        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" name="age" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="new-password"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            placeholder="Select Gender"
            required>
            <option value="" disabled selected hidden>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="country">Country:</label>
          <select id="country" name="country" defaultValue="" required>
            <option value="" disabled selected hidden>
              Select Country
            </option>
            <option value="Russia">Russia</option>
            <option value="Belorussia">Belorussia</option>
            <option value="Georgia">Georgia</option>
            <option value="Australia">Australia</option>
            <option value="Germany">Germany</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="picture">Upload Picture:</label>
          <input
            type="file"
            id="picture"
            name="picture"
            accept="image/png, image/jpeg"
          />
        </div>
        <div className={styles.formGroup}>
          <input type="checkbox" id="terms" name="terms" required />
          <label htmlFor="terms">I accept the Terms and Conditions</label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
