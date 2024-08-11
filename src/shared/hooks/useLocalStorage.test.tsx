import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage tests', () => {
  it('returns the initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'initial'));

    expect(result.current[0]).toBe('initial');
  });

  it('returns the stored value from localStorage', () => {
    localStorage.setItem('test', JSON.stringify('stored value'));

    const { result } = renderHook(() => useLocalStorage('test', 'initial'));

    expect(result.current[0]).toBe('stored value');
  });

  it('updates the stored value and calls handleNameChange when the value is changed', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'initial'));

    act(() => {
      result.current[1]('new value');
    });

    expect(result.current[0]).toBe('new value');
    expect(localStorage.getItem('test')).toBe('"new value"');
  });

  it('uses the default key and initial value when not provided', () => {
    const { result } = renderHook(() => useLocalStorage());

    expect(result.current[0]).toBe('');
    expect(localStorage.getItem('mySearch')).toBe(null);
  });
});
