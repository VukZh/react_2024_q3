import { useTypedDispatch } from './useTypedDispatch';
import { useDispatch } from 'react-redux';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('useTypedDispatch test', () => {
  it('should return the dispatch function from react-redux', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    const dispatch = useTypedDispatch();

    expect(dispatch).toBe(mockDispatch);
    expect(useDispatch).toHaveBeenCalled();
  });
});
