import { renderHook, act } from '@testing-library/react';

import useCustomSearchParams from './useCustomSearchParams';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('useCustomSearchParams tests', () => {
  const mockReplace = jest.fn();

  beforeEach(() => {
    const mockSearchParams = new URLSearchParams('?page=1&name=initial');
    require('next/navigation').useSearchParams.mockReturnValue(
      mockSearchParams,
    );
    require('next/navigation').usePathname.mockReturnValue('/');
    require('next/router').useRouter.mockReturnValue({
      replace: mockReplace,
    });
    jest.clearAllMocks();
  });

  it('returns the correct initial values', () => {
    const { result } = renderHook(() => useCustomSearchParams());

    expect(result.current.searchParams).toBeInstanceOf(URLSearchParams);
    expect(typeof result.current.handleNameChange).toBe('function');
    expect(typeof result.current.handleDetailsChange).toBe('function');
    expect(typeof result.current.handlePageChange).toBe('function');
  });

  it('updates the search params when handleNameChange is called', () => {
    const { result } = renderHook(() => useCustomSearchParams());

    act(() => {
      result.current.handleNameChange('John');
    });

    expect(mockReplace).toHaveBeenCalledWith('/?page=1&name=John&details=');
  });

  it('updates the search params when handleDetailsChange is called', () => {
    const { result } = renderHook(() => useCustomSearchParams());

    act(() => {
      result.current.handleDetailsChange('123');
    });

    expect(mockReplace).toHaveBeenCalledWith(
      '/?page=1&name=initial&details=123',
    );
  });

  it('updates the search params when handlePageChange is called', () => {
    const { result } = renderHook(() => useCustomSearchParams());

    act(() => {
      result.current.handlePageChange('2');
    });

    expect(mockReplace).toHaveBeenCalledWith('/?page=2&name=initial&details=');
  });
});
