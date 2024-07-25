import styles from './themeSwitcher.module.css';
import { useContext } from 'react';
import { Context } from '../../../../../shared/context/contextProvider.tsx';

function ThemeSwitcher() {
  const { setThemeIsDark } = useContext(Context);

  return (
    <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
      <label className={styles.switch}>
        <input
          type="checkbox"
          onChange={(e) => setThemeIsDark(!e.target.checked)}
        />
        <span className={styles.sliderRound}></span>
      </label>
    </div>
  );
}

export default ThemeSwitcher;
