import { Component } from 'react';
import styles from './searchRequest.module.css';
import { LS_MY_SEARCH } from '../../../ui/search.tsx';
import Loader from '../../../../../shared/loader';
import { RickAndMortyCharacter } from '../../../model/types.ts';
import { fetchData } from '../../../api/helpers.ts';

type PropsType = {
  searchText: string;
  changeSearchText: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  changeIsLoading: (isLoading: boolean) => void;
  setCharacters: (characters: RickAndMortyCharacter[]) => void;
};

class SearchRequest extends Component<PropsType, object> {
  handleSearchSubmit = async () => {
    const { searchText, changeIsLoading, setCharacters } = this.props;
    localStorage.setItem(LS_MY_SEARCH, searchText);
    fetchData(searchText, changeIsLoading, setCharacters);
  };

  handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.handleSearchSubmit();
    }
  };

  async componentDidMount() {
    const { changeIsLoading, setCharacters } = this.props;
    const initialSearchText = localStorage.getItem(LS_MY_SEARCH) || '';
    fetchData(initialSearchText, changeIsLoading, setCharacters);
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
          onKeyUp={this.handleKeyPress}
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
