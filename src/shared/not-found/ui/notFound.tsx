import styles from './notFound.module.css';

function NotFound() {
  return (
    <div className={styles.notFoundWrapper}>
      <div className={styles.notFound}> The requested page is missing...</div>
    </div>
  );
}

export default NotFound;
