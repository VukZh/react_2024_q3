import { Component } from 'react';

import styles from './loader.module.css';

class Loader extends Component<{}, {}> {
  render() {
    return (
      <div className={styles.loaderWrapper}>
        <div className={styles.loader}></div>
      </div>
    );
  }
}

export default Loader;
