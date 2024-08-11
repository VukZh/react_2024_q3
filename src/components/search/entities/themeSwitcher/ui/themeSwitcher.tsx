import styles from './themeSwitcher.module.css';
import { useContext } from 'react';
import { Context } from '../../../../../shared/context/contextProvider.tsx';

function ThemeSwitcher() {
  const { setThemeIsDark, themeIsDark } = useContext(Context);
  const switchHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    const selectedValue = e.currentTarget.value;
    if (selectedValue === 'dark') {
      setThemeIsDark(true);
    } else {
      setThemeIsDark(false);
    }
  };

  return (
    <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
      <div className={styles.switch}>
        <input
          type="radio"
          id="radio-dark"
          name="switch"
          value="dark"
          checked={themeIsDark}
          onClick={switchHandler}
          readOnly
        />
        <label htmlFor="radio-dark">Dark</label>
        <input
          type="radio"
          id="radio-light"
          name="switch"
          value="light"
          checked={!themeIsDark}
          onClick={switchHandler}
          readOnly
        />
        <label htmlFor="radio-light">Light</label>
      </div>
    </div>
  );
}

export default ThemeSwitcher;
