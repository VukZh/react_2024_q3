import styles from './loader.module.css';

function Loader() {
  return (
    <div className={styles.loaderWrapper} data-testid="loader-wrapper">
      <div className={styles.loader} data-testid="loader"></div>
    </div>
  );
}

export default Loader;
