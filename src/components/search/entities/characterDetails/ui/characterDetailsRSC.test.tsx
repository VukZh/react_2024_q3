/**
 * @jest-environment node
 */
import CharacterDetailsRSC from './CharacterDetailsRSC';
import { headers } from 'next/headers';
import { getDetailsCharacter } from '../../../api/rickAndMortyAPI';
import { RickAndMortyDetailsCharacter } from '../../../model/types';
import { renderToString } from 'react-dom/server';

jest.mock('next/headers', () => ({
  headers: jest.fn(),
}));

jest.mock('../../../api/rickAndMortyAPI', () => ({
  getDetailsCharacter: jest.fn(),
}));

const mockCharacterDetails: RickAndMortyDetailsCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: {
    name: 'Earth (C-137)',
    url: '',
  },
  location: {
    name: 'Citadel of Ricks',
    url: '',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: [],
  url: '',
  created: '',
};

describe('CharacterDetailsRSC tests', () => {
  beforeAll(() => {
    (headers as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue('?details=1'),
    });

    (getDetailsCharacter as jest.Mock).mockResolvedValue(mockCharacterDetails);
  });

  it('renders character details correctly', async () => {
    const CharacterDetailsRSCRes = await CharacterDetailsRSC();
    const renderOnServer = () => renderToString(CharacterDetailsRSCRes);

    expect(renderOnServer()).toContain('Name:');
    expect(renderOnServer()).toContain('Rick Sanchez');
    expect(renderOnServer()).toContain('Status:');
    expect(renderOnServer()).toContain('Alive');
    expect(renderOnServer()).toContain('Species:');
    expect(renderOnServer()).toContain('Human');
    expect(renderOnServer()).toContain('Location:');
    expect(renderOnServer()).toContain('Citadel of Ricks');
    expect(renderOnServer()).toContain('1.jpeg');
  });
});
