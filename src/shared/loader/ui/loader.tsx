import { Component, ReactNode } from 'react';

import styles from './loader.module.css';

class Loader extends Component<ReactNode, object> {
  render() {
    return (
      <div className={styles.loaderWrapper}>
        <div className={styles.loader}></div>
      </div>
    );
  }
}

export default Loader;
