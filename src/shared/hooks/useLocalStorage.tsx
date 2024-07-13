import { LS_MY_SEARCH } from '../../pages/search/ui/search.tsx';
import { useEffect, useState } from 'react';

export function useLocalStorage(
  key: string = LS_MY_SEARCH,
  initialValue: string = '',
) {
  const getStoredValue = () => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? storedValue : initialValue;
  };

  const [newValue, setNewValue] = useState(getStoredValue());

  useEffect(() => {
    localStorage.setItem(key, newValue);
  }, [newValue]);

  return [newValue, setNewValue];
}
