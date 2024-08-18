import { useTypedDispatch } from './useTypedDispatch.tsx';
import { useTypedSelector } from './useTypedSelector.tsx';
import { useCallback } from 'react';
import { setFormData } from '../store/formUSlice.ts';
import { FormDataType, HistoryFormDataType } from '../types/types.ts';
import { useHistory } from './useHistory.tsx';

const useFormU = () => {
  const dispatch = useTypedDispatch();
  const { formDataU, countries } = useTypedSelector((state) => state.formU);
  const { handleAddHistory } = useHistory();

  const handleSetFormU = useCallback(
    (data: FormDataType) => {
      const historyData = { ...data, formType: 'u' } as HistoryFormDataType;
      handleAddHistory(historyData);
      dispatch(setFormData(data));
    },
    [dispatch],
  );
  return {
    formDataU,
    countries,
    handleSetFormU,
  };
};

export { useFormU };
