import { useTypedDispatch } from './useTypedDispatch.tsx';
import { useTypedSelector } from './useTypedSelector.tsx';
import { useCallback } from 'react';
import { addHistory, resetHistory } from '../store/historySlice.ts';
import { HistoryFormDataType } from '../types/types.ts';

const useHistory = () => {
  const dispatch = useTypedDispatch();
  const { history } = useTypedSelector((state) => state.history);

  const handleAddHistory = useCallback(
    (data: HistoryFormDataType) => {
      dispatch(addHistory(data));
    },
    [dispatch],
  );

  const handleResetHistory = useCallback(() => {
    dispatch(resetHistory());
  }, [dispatch]);

  return {
    history,
    handleAddHistory,
    handleResetHistory,
  };
};

export { useHistory };
