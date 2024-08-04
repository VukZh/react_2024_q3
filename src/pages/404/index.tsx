import styles from './notFound.module.css';
import { useContext } from 'react';
import { Context } from '../../shared/context/contextProvider.tsx';
import ThemeSwitcher from '../../components/search/entities/themeSwitcher';

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
