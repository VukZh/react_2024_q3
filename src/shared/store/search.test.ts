import searchReducer, {
  setSearchText,
  setCharacters,
  setIsShowingDetails,
  setSelectedId,
  setPage,
  setCharacterDetails,
  setSelectedItems,
  setSelectedItemsWithDetails,
  InitialSearchState,
} from './search';

describe('searchSlice tests', () => {
  const initialState = InitialSearchState;

  it('should handle setSearchText', () => {
    const newState = searchReducer(initialState, setSearchText('Rick'));
    expect(newState.searchText).toBe('Rick');
  });

  it('should handle setCharacters', () => {
    const characters = [
      { id: 1, name: 'Rick Sanchez' },
      { id: 2, name: 'Morty Smith' },
    ];
    const newState = searchReducer(initialState, setCharacters(characters));
    expect(newState.characters).toEqual(characters);
  });

  it('should handle setIsShowingDetails', () => {
    const newState = searchReducer(initialState, setIsShowingDetails(false));
    expect(newState.isShowingDetails).toBe(false);
  });

  it('should handle setSelectedId', () => {
    const newState = searchReducer(initialState, setSelectedId(1));
    expect(newState.selectedId).toBe(1);
  });

  it('should handle setPage', () => {
    const page = { currPage: 2, totalPages: 5 };
    const newState = searchReducer(initialState, setPage(page));
    expect(newState.page).toEqual(page);
  });

  it('should handle setCharacterDetails', () => {
    const characterDetails = { id: 1, name: 'Rick Sanchez', status: 'Alive' };
    const newState = searchReducer(
      initialState,
      setCharacterDetails(characterDetails),
    );
    expect(newState.characterDetails).toEqual(characterDetails);
  });

  it('should handle setSelectedItems', () => {
    const selectedItems = [1, 2, 3];
    const newState = searchReducer(
      initialState,
      setSelectedItems(selectedItems),
    );
    expect(newState.selectedItems).toEqual(selectedItems);
  });

  it('should handle setSelectedItemsWithDetails', () => {
    const selectedItemsWithDetails = [
      { id: 1, name: 'Rick Sanchez' },
      { id: 2, name: 'Morty Smith' },
    ];
    const newState = searchReducer(
      initialState,
      setSelectedItemsWithDetails(selectedItemsWithDetails),
    );
    expect(newState.selectedItemsWithDetails).toEqual(selectedItemsWithDetails);
  });
});
