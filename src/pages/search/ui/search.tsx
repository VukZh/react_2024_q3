import { Component, ReactNode } from 'react';

import styles from './search.module.css';
import SearchRequest from '../widgets/search-request';
import SearchResult from '../widgets/search-result';
import ErrorBoundary from '../../../shared/error-boundary';

type StateType = {
  searchText: string;
  isLoading: boolean;
};

export const LS_MY_SEARCH = 'mySearch';

class Search extends Component<ReactNode, StateType> {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      isLoading: false,
    };
  }

  componentDidMount() {
    const searchText = localStorage.getItem(LS_MY_SEARCH);
    if (searchText) {
      this.setState({ ...this.state, searchText });
    }
  }

  changeSearchText = (event) => {
    this.setState({ ...this.state, searchText: event.target.value });
  };

  setIsLoading = (isLoading: boolean) => {
    this.setState({ ...this.state, isLoading });
  };

  render() {
    return (
      <div className={styles.searchWrapper}>
        <SearchRequest
          searchText={this.state.searchText}
          changeSearchText={this.changeSearchText}
          isLoading={this.state.isLoading}
          changeIsLoading={this.setIsLoading}></SearchRequest>
        <ErrorBoundary>
          <SearchResult></SearchResult>
        </ErrorBoundary>
      </div>
    );
  }
}

export default Search;
