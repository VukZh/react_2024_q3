type GenderType = 'male' | 'female';

type CountryType = 'Russia' | 'Belorussia' | 'Georgia' | 'Australia' | 'Germany';

export type FormDataType = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: GenderType;
  country: CountryType;
  picture: File;
  terms: boolean;
};