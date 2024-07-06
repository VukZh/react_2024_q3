import { Component } from 'react';
import styles from './searchRequest.module.css';

type PropsType = {
  searchText: string;
  changeSearchText: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
class SearchRequest extends Component<PropsType, object> {
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
          onClick={() =>
            console.log('Search button clicked', this.props.searchText)
          }>
          Search
        </button>
      </div>
    );
  }
}

export default SearchRequest;
