import { Component, ReactNode } from 'react';

import styles from './search.module.css';
import SearchRequest from '../widgets/search-request';
import SearchResult from '../widgets/search-result';
import ErrorBoundary from '../../../shared/error-boundary';

type StateType = {
  searchText: string;
};

export const LS_MY_SEARCH = 'mySearch';

class Search extends Component<ReactNode, StateType> {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
    };
  }

  componentDidMount() {
    const searchText = localStorage.getItem(LS_MY_SEARCH);
    if (searchText) {
      this.setState({ searchText });
    }
  }

  changeSearchText = (event) => {
    this.setState({ searchText: event.target.value });
  };

  render() {
    return (
      <div className={styles.searchWrapper}>
        <SearchRequest
          searchText={this.state.searchText}
          changeSearchText={this.changeSearchText}></SearchRequest>
        <ErrorBoundary>
          <SearchResult></SearchResult>
        </ErrorBoundary>
      </div>
    );
  }
}

export default Search;
