import { LS_MY_SEARCH } from '../../pages/search/ui/search.tsx';
import { useEffect, useState } from 'react';
import useCustomSearchParams from './useCustomSearchParams.tsx';

export function useLocalStorage(
  key: string = LS_MY_SEARCH,
  initialValue: string = '',
) {
  const getStoredValue = () => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? storedValue : initialValue;
  };

  const { handleNameChange } = useCustomSearchParams();

  const [newValue, setNewValue] = useState(getStoredValue());

  useEffect(() => {
    localStorage.setItem(key, newValue);
    handleNameChange(newValue);
    handleNameChange(newValue);
  }, [newValue]);

  return [newValue, setNewValue];
}
