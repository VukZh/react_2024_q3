import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CountryType, GenderType } from '../types/types.ts';

export type FormDataSliceType = {
  formDataRHF: {
    name: string;
    age: number;
    email: string;
    password: string;
    confirmPassword: string;
    gender: GenderType | '';
    country: CountryType | '';
    picture: File | null;
    terms: boolean;
  };
};

const initialState: FormDataSliceType = {
  formDataRHF: {
    name: '',
    age: 0,
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    country: '',
    picture: null,
    terms: false,
  },
};

const formUSlice = createSlice({
  name: 'formRHF',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormDataSliceType>) => {
      return action.payload;
    },
  },
});

export const { setFormData } = formUSlice.actions;

export default formUSlice.reducer;
