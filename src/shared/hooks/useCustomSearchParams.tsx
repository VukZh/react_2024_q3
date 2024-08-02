import { useSearchParams } from 'next/navigation';

function useCustomSearchParams() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString())

  // const _setSearchParams = setSearchParams;

  // const updateSearchParams = (updater) => {
  //   setSearchParams((prev) => {
  //     const newParams = new URLSearchParams(prev);
  //     updater(prev);
  //     return newParams;
  //   });
  // };

  const handleNameChange = (newName) => {
    // updateSearchParams((prev) => {
    //   prev.set('name', newName);
    //   return prev;
    // });
    params.set('name', newName);
  };

  const handleDetailsChange = (newId) => {
    // updateSearchParams((prev) => {
    //   prev.set('details', newId);
    //   return prev;
    // });
    params.set('details', newId);
  };

  const handlePageChange = (page) => {
    // updateSearchParams((prev) => {
    //   prev.set('page', page);
    //   return prev;
    // });
    params.set('page', page);
  };

  return {
    searchParams,
    handleNameChange,
    handleDetailsChange,
    handlePageChange,
  };
}

export default useCustomSearchParams;
