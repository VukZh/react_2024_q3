import { AppDispatch } from '../store/store.ts';
import { useDispatch } from 'react-redux';

type DispatchFunc = () => AppDispatch;
export const useTypedDispatch: DispatchFunc = useDispatch;