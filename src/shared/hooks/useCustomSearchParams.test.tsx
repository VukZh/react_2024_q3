import { renderHook, act } from '@testing-library/react';

import { MemoryRouter, useSearchParams } from 'react-router-dom';
import useCustomSearchParams from './useCustomSearchParams';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest.fn(),
}));

describe('useCustomSearchParams tests', () => {
  beforeEach(() => {
    useSearchParams.mockReturnValue([new URLSearchParams(), jest.fn()]);
  });

  it('returns the correct initial values', () => {
    const { result } = renderHook(() => useCustomSearchParams(), {
      wrapper: MemoryRouter,
    });

    expect(result.current.searchParams).toBeInstanceOf(URLSearchParams);
    expect(typeof result.current.handleNameChange).toBe('function');
    expect(typeof result.current.handleDetailsChange).toBe('function');
    expect(typeof result.current.handlePageChange).toBe('function');
  });

  it('updates the search params when handleNameChange is called', () => {
    const setSearchParams = jest.fn();
    useSearchParams.mockReturnValue([new URLSearchParams(), setSearchParams]);

    const { result } = renderHook(() => useCustomSearchParams(), {
      wrapper: MemoryRouter,
    });

    act(() => {
      result.current.handleNameChange('John');
    });

    expect(setSearchParams).toHaveBeenCalledWith(expect.any(Function));
  });

  it('updates the search params when handleDetailsChange is called', () => {
    const setSearchParams = jest.fn();
    useSearchParams.mockReturnValue([new URLSearchParams(), setSearchParams]);

    const { result } = renderHook(() => useCustomSearchParams(), {
      wrapper: MemoryRouter,
    });

    act(() => {
      result.current.handleDetailsChange('123');
    });

    expect(setSearchParams).toHaveBeenCalledWith(expect.any(Function));
  });

  it('updates the search params when handlePageChange is called', () => {
    const setSearchParams = jest.fn();
    useSearchParams.mockReturnValue([new URLSearchParams(), setSearchParams]);

    const { result } = renderHook(() => useCustomSearchParams(), {
      wrapper: MemoryRouter,
    });

    act(() => {
      result.current.handlePageChange('2');
    });

    expect(setSearchParams).toHaveBeenCalledWith(expect.any(Function));
  });
});
