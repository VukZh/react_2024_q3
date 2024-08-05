import React from 'react';
import { render, screen } from '@testing-library/react';
import Home, { getServerSideProps } from '../pages';
import App from '../container/App.tsx';
import {
  fetchCharacters,
  getDetailsCharacter,
} from '../components/search/api/rickAndMortyAPI.ts';
import '@testing-library/jest-dom';

type ContextType = {
  query: {
    name: string;
    page: string;
    details: string;
  };
};
jest.mock('next/head', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('../container/App.tsx', () =>
  jest.fn(() => <div>Main Component</div>),
);

jest.mock('../components/search/api/rickAndMortyAPI.ts', () => ({
  fetchCharacters: jest.fn(),
  getDetailsCharacter: jest.fn(),
}));

describe('Main Component tests', () => {
  it('renders the Main component', () => {
    const charactersData = { characters: [], page: 3 };
    const detailsData = null;

    render(<Home charactersData={charactersData} detailsData={detailsData} />);

    expect(screen.getByText('Main Component')).toBeInTheDocument();
    expect(App).toHaveBeenCalledWith(
      {
        characters: charactersData.characters,
        page: charactersData.page,
        details: detailsData,
      },
      {},
    );
  });

  it('test meta information', () => {
    const charactersData = { characters: [], page: 1 };
    const detailsData = null;

    render(<Home charactersData={charactersData} detailsData={detailsData} />);

    expect(document.title).toBe('Rick and Morty Search');
    expect(
      document
        .querySelector('meta[name="description"]')
        ?.getAttribute('content'),
    ).toBe('Search for Rick and Morty characters');
    expect(
      document.querySelector('link[rel="icon"]')?.getAttribute('href'),
    ).toBe('/images/rm.png');
  });
});

describe('getServerSideProps', () => {
  it('get characters and details', async () => {
    const context: ContextType = {
      query: {
        name: 'Rick',
        page: '42',
        details: '1',
      },
    };

    const charactersResponse = {
      characters: [{ id: 1, name: 'Rick Sanchez' }],
      page: 42,
    };
    const detailsResponse = { id: 1, name: 'Morty Smith' };

    (fetchCharacters as jest.Mock).mockResolvedValue(charactersResponse);
    (getDetailsCharacter as jest.Mock).mockResolvedValue(detailsResponse);

    const result = await getServerSideProps(context);

    expect(fetchCharacters).toHaveBeenCalledWith('Rick', 42);
    expect(getDetailsCharacter).toHaveBeenCalledWith(1);
    expect(result).toEqual({
      props: {
        charactersData: charactersResponse,
        detailsData: detailsResponse,
      },
    });
  });

  it('get handles errors', async () => {
    const context: ContextType = {
      query: {
        name: 'Rick',
        page: '42',
        details: '1',
      },
    };

    const errorMessage = 'Error fetching data';

    (fetchCharacters as jest.Mock).mockRejectedValue(new Error(errorMessage));
    (getDetailsCharacter as jest.Mock).mockRejectedValue(
      new Error(errorMessage),
    );

    const result = await getServerSideProps(context);

    expect(result?.props?.error!).toBe(errorMessage);
  });
});
