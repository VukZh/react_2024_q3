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

  const handleNameChange = (newName) => {
    updateSearchParams((prev) => {
      prev.set('name', newName);
      return prev;
    });
  };

  const handleDetailsChange = (newId) => {
    updateSearchParams((prev) => {
      prev.set('details', newId);
      return prev;
    });
  };

  const handlePageChange = (page) => {
    updateSearchParams((prev) => {
      prev.set('page', page);
      return prev;
    });
  };

  return {
    searchParams,
    handleNameChange,
    handleDetailsChange,
    handlePageChange,
  };
}

export default useCustomSearchParams;
