import { Component, ReactNode } from 'react';

import style from './loader.module.css';

class Loader extends Component<ReactNode, object> {
  render() {
    return <div className={style.loader}></div>;
  }
}

export default Loader;
