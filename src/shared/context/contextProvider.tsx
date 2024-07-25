import {
  PageType,
  RickAndMortyCharacterType,
} from '../../pages/search/model/types.ts';
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from 'react';

export interface ContextType {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<ContextType['searchText']>>;
  isLoading: boolean;
  setIsLoading: Dispatch<React.SetStateAction<ContextType['isLoading']>>;
  characters: RickAndMortyCharacterType[];
  setCharacters: Dispatch<React.SetStateAction<ContextType['characters']>>;
  isShowingDetails: boolean;
  setIsShowingDetails: Dispatch<
    SetStateAction<ContextType['isShowingDetails']>
  >;
  selectedId: number;
  setSelectedId: Dispatch<SetStateAction<ContextType['selectedId']>>;
  page: PageType;
  setPage: Dispatch<React.SetStateAction<ContextType['page']>>;
  isLoadingDetails: boolean;
  setIsLoadingDetails: Dispatch<
    SetStateAction<ContextType['isLoadingDetails']>
  >;
  characterDetails: RickAndMortyCharacterType;
  setCharacterDetails: Dispatch<
    SetStateAction<ContextType['characterDetails']>
  >;
  themeIsDark: boolean;
  setThemeIsDark: Dispatch<SetStateAction<ContextType['themeIsDark']>>;
}

const InitialContext: ContextType = {
  searchText: '',
  setSearchText: () => {},
  isLoading: false,
  setIsLoading: () => {},
  characters: [],
  setCharacters: () => {},
  isShowingDetails: true,
  setIsShowingDetails: () => {},
  selectedId: 0,
  setSelectedId: () => {},
  page: { currPage: 1, totalPages: 1 },
  setPage: () => {},
  isLoadingDetails: false,
  setIsLoadingDetails: () => {},
  characterDetails: {
    id: 0,
    name: '',
    status: '',
    species: '',
    type: '',
    gender: '',
    origin: {
      name: '',
      url: '',
    },
    location: {
      name: '',
      url: '',
    },
    image: '',
    episode: [],
    url: '',
    created: '',
  },
  setCharacterDetails: () => {},
  themeIsDark: true,
  setThemeIsDark: () => {},
};

export const Context = createContext(InitialContext);

export function ContextProvider({ children }: PropsWithChildren<object>) {
  const [searchText, setSearchText] = useState<ContextType['searchText']>(
    InitialContext.searchText,
  );
  const [isLoading, setIsLoading] = useState<ContextType['isLoading']>(
    InitialContext.isLoading,
  );
  const [characters, setCharacters] = useState<ContextType['characters']>(
    InitialContext.characters,
  );
  const [isShowingDetails, setIsShowingDetails] = useState<
    ContextType['isShowingDetails']
  >(InitialContext.isShowingDetails);
  const [selectedId, setSelectedId] = useState<ContextType['selectedId']>(
    InitialContext.selectedId,
  );
  const [page, setPage] = useState<ContextType['page']>(InitialContext.page);
  const [isLoadingDetails, setIsLoadingDetails] = useState<
    ContextType['isLoadingDetails']
  >(InitialContext.isLoadingDetails);
  const [characterDetails, setCharacterDetails] = useState<
    ContextType['characterDetails']
  >(InitialContext.characterDetails);
  const [themeIsDark, setThemeIsDark] = useState<ContextType['themeIsDark']>(
    InitialContext.themeIsDark,
  );

  return (
    <Context.Provider
      value={{
        searchText,
        setSearchText,
        isLoading,
        setIsLoading,
        characters,
        setCharacters,
        isShowingDetails,
        setIsShowingDetails,
        selectedId,
        setSelectedId,
        page,
        setPage,
        isLoadingDetails,
        setIsLoadingDetails,
        characterDetails,
        setCharacterDetails,
        themeIsDark,
        setThemeIsDark,
      }}>
      {children}
    </Context.Provider>
  );
}
