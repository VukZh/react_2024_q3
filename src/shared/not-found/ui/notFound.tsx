import styles from './notFound.module.css';
import ThemeSwitcher from '../../../pages/search/entities/themeSwitcher';
import { useContext } from 'react';
import { Context } from '../../context/contextProvider.tsx';

function NotFound() {
  const { themeIsDark } = useContext(Context);

  return (
    <div
      className={`${styles.notFoundWrapper} ${themeIsDark ? '' : styles.light}`}>
      <div className={styles.notFound}> The requested page is missing...</div>
      <ThemeSwitcher />
    </div>
  );
}

export default NotFound;
