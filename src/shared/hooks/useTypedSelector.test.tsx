import { useTypedSelector } from './useTypedSelector';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store.ts';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('useTypedSelector test', () => {
  it('should call useSelector with the given selector function', () => {
    const mockSelector = (state: RootState) => state.search;
    const mockSearchState = {
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
    };

    useSelector.mockReturnValue(mockSearchState);

    const result = useTypedSelector(mockSelector);

    expect(useSelector).toHaveBeenCalledWith(mockSelector);
    expect(result).toEqual(mockSearchState);
  });
});
