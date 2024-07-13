import { useSearchParams } from 'react-router-dom';

function useCustomSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = (updater) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      updater(prev);
      return newParams;
    });
  };

  return [searchParams, updateSearchParams];
}

export default useCustomSearchParams;
