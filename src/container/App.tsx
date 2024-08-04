import Search from '../components/search';
import {
  PageType,
  RickAndMortyCharacterType,
} from '../components/search/model/types.ts';

type AppPropsType = {
  characters: RickAndMortyCharacterType[];
  page: PageType;
  details: RickAndMortyCharacterType | null;
};

export default function App({ characters, page, details }: AppPropsType) {
  return (
    <div>
      <Search characters={characters} page={page} details={details} />
    </div>
  );
}
