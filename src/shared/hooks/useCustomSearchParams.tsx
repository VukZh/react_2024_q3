'use client';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

function useCustomSearchParams() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleNameChange = (newName: string) => {
    const details = searchParams.get('details')
      ? `&details=${searchParams.get('details')}`
      : '&details=';

    replace(`${pathname}?page=1` + `&name=${newName}` + details);
  };

  const handleDetailsChange = (newId: number) => {
    const name = searchParams.get('name')
      ? `&name=${searchParams.get('name')}`
      : '&name=';
    const page = searchParams.get('page')
      ? `?page=${searchParams.get('page')}`
      : '?page=1';

    replace(`${pathname}${page}${name}&details=${newId || ''}`);
  };

  const handlePageChange = (page: number) => {
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
