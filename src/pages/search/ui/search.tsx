import { ChangeEvent, Component, ReactNode } from 'react';

import styles from './search.module.css';
import SearchRequest from '../widgets/search-request';
import SearchResult from '../widgets/search-result';
import { RickAndMortyCharacter } from '../model/types.ts';
import { getDetailsCharacter, getShortCharacters } from '../api/helpers.ts';
import CharacterDetails from '../entities/characterDetails/ui/characterDetails.tsx';

type StateType = {
  searchText: string;
  isLoading: boolean;
  characters: RickAndMortyCharacter[];
};

export const LS_MY_SEARCH = 'mySearch';

class Search extends Component<ReactNode, StateType> {
  constructor(props: ReactNode) {
    super(props);

    this.state = {
      searchText: '',
      isLoading: false,
      characters: [],
    };
  }

  componentDidMount() {
    const searchText = localStorage.getItem(LS_MY_SEARCH);
    if (searchText) {
      this.setState({ ...this.state, searchText });
    }
  }

  changeSearchText = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchText: event.target.value });
  };

  setCharacters = (characters: RickAndMortyCharacter[]) => {
    this.setState({ characters });
  };

  setIsLoading = (isLoading: boolean) => {
    this.setState({ isLoading });
  };

  render() {
    return (
      <div className={styles.searchWrapper}>
        <SearchRequest
          searchText={this.state.searchText}
          changeSearchText={this.changeSearchText}
          isLoading={this.state.isLoading}
          changeIsLoading={this.setIsLoading}
          setCharacters={this.setCharacters}></SearchRequest>
        <div className={styles.resultsWrapper}>
          <SearchResult
            characters={getShortCharacters(
              this.state.characters,
            )}></SearchResult>

          {this.state.characters.length ? (
            <CharacterDetails
              character={getDetailsCharacter(
                this.state.characters,
                37,
              )}></CharacterDetails>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Search;
