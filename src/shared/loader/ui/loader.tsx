import styles from './loader.module.css';

function Loader() {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loader}></div>
    </div>
  );
}

export default Loader;
