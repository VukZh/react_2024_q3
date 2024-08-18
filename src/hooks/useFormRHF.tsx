import { useTypedDispatch } from './useTypedDispatch.tsx';
import { useTypedSelector } from './useTypedSelector.tsx';
import { useCallback } from 'react';
import { setFormData } from '../store/formRHFSlice.ts';
import { FormDataType, HistoryFormDataType } from '../types/types.ts';
import { useHistory } from './useHistory.tsx';

const useFormRHF = () => {
  const dispatch = useTypedDispatch();
  const { formDataRHF, countries } = useTypedSelector((state) => state.formRHF);
  const { handleAddHistory } = useHistory();

  const handleSetFormRHF = useCallback(
    (data: FormDataType) => {
      const historyData = { ...data, formType: 'rhf' } as HistoryFormDataType;
      handleAddHistory(historyData);
      dispatch(setFormData(data));
    },
    [dispatch],
  );
  return {
    formDataRHF,
    countries,
    handleSetFormRHF,
  };
};

export { useFormRHF };
