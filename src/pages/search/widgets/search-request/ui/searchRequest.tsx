import { Component } from 'react';
import styles from './searchRequest.module.css';
import { LS_MY_SEARCH } from '../../../ui/search.tsx';
import { searchCharacters } from '../../../api/rickAndMortyAPI.ts';
import Loader from '../../../../../shared/loader';

type PropsType = {
  searchText: string;
  changeSearchText: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  changeIsLoading: (isLoading: boolean) => void;
};
class SearchRequest extends Component<PropsType, object> {
  handleSearchSubmit = async () => {
    localStorage.setItem(LS_MY_SEARCH, this.props.searchText);
    try {
      this.props.changeIsLoading(true);
      await searchCharacters(this.props.searchText);
      this.props.changeIsLoading(false);
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  async componentDidMount() {
    const initialSearchText = localStorage.getItem(LS_MY_SEARCH);
    if (initialSearchText) {
      try {
        this.props.changeIsLoading(true);
        const res = await searchCharacters(initialSearchText);
        this.props.changeIsLoading(false);
      } catch (error) {
        console.error('Error during search:', error);
      }
    }
  }

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
        {!this.props.isLoading ? (
          <button
            className={styles.buttonSearch}
            onClick={this.handleSearchSubmit}>
            Search
          </button>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

export default SearchRequest;
