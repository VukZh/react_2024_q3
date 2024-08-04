import {usePathname, useSearchParams} from 'next/navigation';
import {useRouter} from "next/router";

function replacePageParam(queryString, key, pageValue) {
  const params = new URLSearchParams(queryString.split('/')[1]);
  params.set(key, pageValue);
  return params.toString();
}

function useCustomSearchParams() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString())
  const { asPath } = useRouter();
  const {replace} = useRouter();
  const pathname = usePathname();

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
    // params.set('name', newName);
    const pageNumber = searchParams.get('page') ? `?page=${searchParams.get('page')}` : '?page=1'
    const details = searchParams.get('details') ? `&details=${searchParams.get('details')}` : '&details='

    // console.log('page-----', page, name, `+++ ${pathname}?page=${page}` + name);
    // replace(`${pathname}?page=${page}` + name)


    replace(`${pathname}?page=1` + `&name=${newName}` + details)
  };

  const handleDetailsChange = (newId) => {
    // updateSearchParams((prev) => {
    //   prev.set('details', newId);
    //   return prev;
    // });
    // params.set('details', newId);
    const name = searchParams.get('name') ? `&name=${searchParams.get('name')}` : '&name='
    const page = searchParams.get('page') ? `?page=${searchParams.get('page')}` : '?page=1'

    replace(`${pathname}${page}${name}&details=${newId || ''}`);

  };

  const handlePageChange = (page) => {
    // updateSearchParams((prev) => {
    //   prev.set('page', page);
    //   return prev;
    // });
    // params.set('page', page);

    const name = searchParams.get('name') ? `&name=${searchParams.get('name')}` : '&name='
    const details = searchParams.get('details') ? `&details=${searchParams.get('details')}` : '&details='

    console.log('page-----', asPath.split('/')[1]);



    replace(`${pathname}?page=${page}` + name + details)
  };

  return {
    searchParams,
    handleNameChange,
    handleDetailsChange,
    handlePageChange,
  };
}

export default useCustomSearchParams;
