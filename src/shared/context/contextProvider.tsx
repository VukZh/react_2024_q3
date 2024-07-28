import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from 'react';

export interface ContextType {
  themeIsDark: boolean;
  setThemeIsDark: Dispatch<SetStateAction<ContextType['themeIsDark']>>;
}

const InitialContext: ContextType = {
  themeIsDark: true,
  setThemeIsDark: () => {},
};

export const Context = createContext(InitialContext);

export function ContextProvider({ children }: PropsWithChildren<object>) {
  const [themeIsDark, setThemeIsDark] = useState<ContextType['themeIsDark']>(
    InitialContext.themeIsDark,
  );

  return (
    <Context.Provider
      value={{
        themeIsDark,
        setThemeIsDark,
      }}>
      {children}
    </Context.Provider>
  );
}
