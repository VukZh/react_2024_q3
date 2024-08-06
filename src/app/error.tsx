'use client';

import { useEffect } from 'react';
import styles from './error.module.css';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <div className={styles.textMessage}>Something went wrong.</div>;
}
