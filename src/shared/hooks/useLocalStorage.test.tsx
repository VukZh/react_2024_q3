import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';
import useCustomSearchParams from './useCustomSearchParams.tsx';

jest.mock('./useCustomSearchParams.tsx');

describe('useLocalStorage tests', () => {
  beforeEach(() => {
    localStorage.clear();
    useCustomSearchParams.mockReturnValue({
      handleNameChange: jest.fn(),
    });
  });

  it('returns the initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'initial'));

    expect(result.current[0]).toBe('initial');
  });

  it('returns the stored value from localStorage', () => {
    localStorage.setItem('test', 'stored value');

    const { result } = renderHook(() => useLocalStorage('test', 'initial'));

    expect(result.current[0]).toBe('stored value');
  });

  it('updates the stored value and calls handleNameChange when the value is changed', () => {
    const handleNameChange = jest.fn();
    useCustomSearchParams.mockReturnValue({
      handleNameChange,
    });

    const { result } = renderHook(() => useLocalStorage('test', 'initial'));

    act(() => {
      result.current[1]('new value');
    });

    expect(result.current[0]).toBe('new value');
    expect(localStorage.getItem('test')).toBe('new value');
    expect(handleNameChange).toHaveBeenCalled();
    expect(handleNameChange).toHaveBeenCalledWith('new value');
  });

  it('uses the default key and initial value when not provided', () => {
    const { result } = renderHook(() => useLocalStorage());

    expect(result.current[0]).toBe('');
    expect(localStorage.getItem('mySearch')).toBe('');
  });
});
