import { useState } from 'react';
import { LS_MY_SEARCH } from '../../components/search/ui/search.tsx';

export function useLocalStorage(
  key: string = LS_MY_SEARCH,
  initialValue: string = '',
) {
  const setValue = (value: string) => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
        setState(value);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const [state, setState] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const value = window.localStorage.getItem(key);
        return value ? JSON.parse(value) : initialValue;
      } catch (error) {
        console.error(error);
      }
    }
  });

  return [state, setValue];
}
