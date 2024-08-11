/**
 * @jest-environment node
 */

import SearchResult from './SearchResult';
import '@testing-library/jest-dom';
import { fetchCharacters } from '../../../api/rickAndMortyAPI.ts';
import { renderToString } from 'react-dom/server';
jest.mock('../../../api/rickAndMortyAPI', () => ({
  fetchCharacters: jest.fn(),
}));
describe('SearchResult', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fetchCharacters as jest.Mock).mockResolvedValue([]);
  });

  it('renders "No results" when there are no characters', async () => {
    const SearchResultRSC = await SearchResult();
    const renderOnServer = () => renderToString(SearchResultRSC);

    expect(renderOnServer()).toContain('No results');
  });
});
