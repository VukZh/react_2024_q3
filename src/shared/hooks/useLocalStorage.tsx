import { useEffect, useState } from 'react';
// import useCustomSearchParams from './useCustomSearchParams.tsx';
import {LS_MY_SEARCH} from "../../components/search/ui/search.tsx";

export function useLocalStorage(
  key: string = LS_MY_SEARCH,
  initialValue: string = '',
) {
  const setValue = value => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
      setState(value)
    } catch (error) {
      console.error(error)
    }
  }

  // const { handleNameChange } = useCustomSearchParams();

  const [state, setState] = useState(() => {
    try {
      const value = window.localStorage.getItem(key)
      return value ? JSON.parse(value) : initialValue
    } catch (error) {
      console.error(error)
    }
  })

  return [state, setValue];
}
