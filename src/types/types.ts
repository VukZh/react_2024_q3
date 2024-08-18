export type GenderType = 'male' | 'female';

type CountryOptionType = {
  label: CountryType;
  value: CountryType;
};

export type CountryType =
  | 'Russia'
  | 'Belarus'
  | 'Georgia'
  | 'Australia'
  | 'Germany';

export type FormDataType = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: GenderType | '';
  country: CountryType | '';
  picture: string;
  terms: boolean;
};

export type HistoryFormDataType =
  | FormDataType
  | {
      formType: 'u' & 'rhf';
    };
