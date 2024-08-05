import { renderHook, act } from '@testing-library/react';
import { useSearch } from './useSearch';
import { useTypedSelector } from './useTypedSelector';
import { useTypedDispatch } from './useTypedDispatch';
import { RickAndMortyCharacterType } from '../../components/search/model/types.ts';

jest.mock('./useTypedSelector');
jest.mock('./useTypedDispatch');

describe('useSearch tests', () => {
  const mockState = {
    search: {
      searchText: '',
      isLoading: false,
      characters: [],
      isShowingDetails: false,
      selectedId: 0,
      page: 1,
      isLoadingDetails: false,
      characterDetails: null,
      selectedItems: [],
      selectedItemsWithDetails: [],
    },
  };

  beforeEach(() => {
    useTypedSelector.mockImplementation((selectorFn) => selectorFn(mockState));
    useTypedDispatch.mockReturnValue(jest.fn());
  });

  it('should return the correct state and callback functions', () => {
    const { result } = renderHook(() => useSearch());

    expect(result.current.searchText).toBe('');
    expect(result.current.characters).toEqual([]);
    expect(result.current.isShowingDetails).toBe(false);
    expect(result.current.selectedId).toBe(0);
    expect(result.current.page).toBe(1);
    expect(result.current.characterDetails).toBeNull();
    expect(result.current.selectedItems).toEqual([]);
    expect(result.current.selectedItemsWithDetails).toEqual([]);

    expect(typeof result.current.handleSetSearchTextCallback).toBe('function');
    expect(typeof result.current.handleSetCharactersCallback).toBe('function');
    expect(typeof result.current.handleSetIsShowingDetailsCallback).toBe(
      'function',
    );
    expect(typeof result.current.handleSetSelectedIdCallback).toBe('function');
    expect(typeof result.current.handleSetPageCallback).toBe('function');
    expect(typeof result.current.handleSetCharacterDetailsCallback).toBe(
      'function',
    );
    expect(typeof result.current.handleSetSelectedItemsCallback).toBe(
      'function',
    );
  });

  it('should dispatch the correct actions when callback functions are called', () => {
    const mockDispatch = jest.fn();
    useTypedDispatch.mockReturnValue(mockDispatch);

    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.handleSetSearchTextCallback('test');
      result.current.handleSetCharactersCallback([
        { id: 1, name: 'Rick' },
      ] as RickAndMortyCharacterType[]);
      result.current.handleSetIsShowingDetailsCallback(true);
      result.current.handleSetSelectedIdCallback(1);
    });

    expect(mockDispatch).toHaveBeenCalledTimes(4);
  });
});
