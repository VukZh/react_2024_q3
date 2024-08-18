export type GenderType = 'male' | 'female';

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
  gender: GenderType;
  country: CountryType;
  picture: string;
  terms: boolean;
};
