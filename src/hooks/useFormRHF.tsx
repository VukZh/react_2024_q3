import { useTypedDispatch } from './useTypedDispatch.tsx';
import { useTypedSelector } from './useTypedSelector.tsx';
import { useCallback } from 'react';
import { setFormData } from '../store/formRHFSlice.ts';
import { FormDataType } from '../types/types.ts';

const useFormRHF = () => {
  const dispatch = useTypedDispatch();
  const { formDataRHF } = useTypedSelector((state) => state.formRHF);

  const handleSetFormRHF = useCallback(
    (data: FormDataType) => {
      dispatch(setFormData({ formDataRHF: data! }));
    },
    [dispatch],
  );
  return {
    formDataRHF,
    handleSetFormRHF,
  };
};

export { useFormRHF };
