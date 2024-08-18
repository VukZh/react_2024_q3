import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CountryType, FormDataType } from '../types/types.ts';
import { COUNTRIES } from '../helpers/countries.ts';

export type FormDataSliceType = {
  formDataRHF: FormDataType;
  countries: CountryType[];
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
    picture: '',
    terms: false,
  },
  countries: COUNTRIES,
};

const formUSlice = createSlice({
  name: 'formRHF',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormDataType>) => {
      state.formDataRHF = action.payload;
    },
  },
});

export const { setFormData } = formUSlice.actions;

export default formUSlice.reducer;
