import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

function replacePageParam(queryString, key, pageValue) {
  const params = new URLSearchParams(queryString.split('/')[1]);
  params.set(key, pageValue);
  return params.toString();
}

function useCustomSearchParams() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleNameChange = (newName) => {
    const details = searchParams.get('details')
      ? `&details=${searchParams.get('details')}`
      : '&details=';

    replace(`${pathname}?page=1` + `&name=${newName}` + details);
  };

  const handleDetailsChange = (newId) => {
    const name = searchParams.get('name')
      ? `&name=${searchParams.get('name')}`
      : '&name=';
    const page = searchParams.get('page')
      ? `?page=${searchParams.get('page')}`
      : '?page=1';

    replace(`${pathname}${page}${name}&details=${newId || ''}`);
  };

  const handlePageChange = (page) => {
    const name = searchParams.get('name')
      ? `&name=${searchParams.get('name')}`
      : '&name=';
    const details = searchParams.get('details')
      ? `&details=${searchParams.get('details')}`
      : '&details=';

    replace(`${pathname}?page=${page}` + name + details);
  };

  return {
    searchParams,
    handleNameChange,
    handleDetailsChange,
    handlePageChange,
  };
}

export default useCustomSearchParams;
