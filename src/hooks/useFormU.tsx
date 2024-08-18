import { useTypedDispatch } from './useTypedDispatch.tsx';
import { useTypedSelector } from './useTypedSelector.tsx';
import { useCallback } from 'react';
import { setFormData } from '../store/formUSlice.ts';
import { FormDataType } from '../types/types.ts';

const useFormU = () => {
  const dispatch = useTypedDispatch();
  const { formDataU } = useTypedSelector((state) => state.formU);

  const handleSetFormU = useCallback(
    (data: FormDataType) => {
      dispatch(setFormData({ formDataU: data }));
    },
    [dispatch],
  );
  return {
    formDataU,
    handleSetFormU,
  };
};

export { useFormU };
