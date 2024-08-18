import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CountryType, FormDataType, GenderType } from '../types/types.ts';
import { COUNTRIES } from '../helpers/countries.ts';

type FormDataSliceType = {
  formDataU: FormDataType;
  countries: CountryType[];
};

const initialState: FormDataSliceType = {
  formDataU: {
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
  name: 'formU',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormDataType>) => {
      state.formDataU = action.payload;
    },
  },
});

export const { setFormData } = formUSlice.actions;

export default formUSlice.reducer;
