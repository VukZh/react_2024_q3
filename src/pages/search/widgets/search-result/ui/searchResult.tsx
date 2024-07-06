import React, { Component, ReactNode } from 'react';
import styles from './searchResult.module.css';

type StateType = { errorIsThrown: boolean };

class SearchResult extends Component<ReactNode, StateType> {
  constructor(props) {
    super(props);
    this.state = {
      errorIsThrown: false,
    };
  }

  makeError = () => {
    this.setState({ errorIsThrown: true });
  };

  componentDidUpdate(
    prevProps: Readonly<ReactNode>,
    prevState: Readonly<StateType>,
  ) {
    if (this.state.errorIsThrown) {
      throw new Error('Something went wrong.');
    }
  }

  render() {
    return (
      <div className={styles.searchResult}>
        <div className={styles.searchItem}>1</div>
        <div className={styles.searchItem}>2</div>
        <div className={styles.searchItem}>3</div>
        <div className={styles.searchItem}>4</div>
        <div className={styles.searchItem}>5</div>
        <button className={styles.error} onClick={this.makeError}>
          Error
        </button>
      </div>
    );
  }
}

export default SearchResult;
