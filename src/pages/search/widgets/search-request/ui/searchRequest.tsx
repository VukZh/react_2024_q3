import { Component } from 'react';
import styles from './searchRequest.module.css';
import { LS_MY_SEARCH } from '../../../ui/search.tsx';

type PropsType = {
  searchText: string;
  changeSearchText: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
class SearchRequest extends Component<PropsType, object> {
  handleSearchSubmit = () => {
    localStorage.setItem(LS_MY_SEARCH, this.props.searchText);
  };

  render() {
    return (
      <div className={styles.inputWrapper}>
        <input
          type="text"
          placeholder="Enter search query"
          className={styles.inputSearch}
          value={this.props.searchText}
          onChange={this.props.changeSearchText}
        />
        <button
          className={styles.buttonSearch}
          onClick={this.handleSearchSubmit}>
          Search
        </button>
      </div>
    );
  }
}

export default SearchRequest;
