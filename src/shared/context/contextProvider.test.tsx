import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ContextProvider, Context } from './contextProvider.tsx';
import '@testing-library/jest-dom';

describe('ContextProvider tests', () => {
  it('provides the initial context values', () => {
    render(
      <ContextProvider>
        <Context.Consumer>
          {(value) => (
            <>
              <div data-testid="searchText">{value.searchText}</div>
              <div data-testid="isLoading">{value.isLoading.toString()}</div>
              <div data-testid="characters">{value.characters.length}</div>
              <div data-testid="isShowingDetails">
                {value.isShowingDetails.toString()}
              </div>
              <div data-testid="selectedId">{value.selectedId}</div>
              <div data-testid="page">
                {value.page.currPage} - {value.page.totalPages}
              </div>
              <div data-testid="isLoadingDetails">
                {value.isLoadingDetails.toString()}
              </div>
              <div data-testid="characterDetails">
                {value.characterDetails.name}
              </div>
            </>
          )}
        </Context.Consumer>
      </ContextProvider>,
    );

    expect(screen.getByTestId('searchText')).toHaveTextContent('');
    expect(screen.getByTestId('isLoading')).toHaveTextContent('false');
    expect(screen.getByTestId('characters')).toHaveTextContent('0');
    expect(screen.getByTestId('isShowingDetails')).toHaveTextContent('true');
    expect(screen.getByTestId('selectedId')).toHaveTextContent('0');
    expect(screen.getByTestId('page')).toHaveTextContent('1 - 1');
    expect(screen.getByTestId('isLoadingDetails')).toHaveTextContent('false');
    expect(screen.getByTestId('characterDetails')).toHaveTextContent('');
  });

  it('updates the context values when the setters are called', () => {
    const TestComponent = () => {
      const {
        setSearchText,
        setIsLoading,
        setCharacters,
        setIsShowingDetails,
        setSelectedId,
        setPage,
        setIsLoadingDetails,
        setCharacterDetails,
      } = React.useContext(Context);

      const handleClick = () => {
        setSearchText('test');
        setIsLoading(true);
        setCharacters([{ id: 1, name: 'Rick' }]);
        setIsShowingDetails(false);
        setSelectedId(1);
        setPage({ currPage: 2, totalPages: 5 });
        setIsLoadingDetails(true);
        setCharacterDetails({ id: 1, name: 'Rick' });
      };

      return <button onClick={handleClick}>Update Context</button>;
    };

    render(
      <ContextProvider>
        <TestComponent />
        <Context.Consumer>
          {(value) => (
            <>
              <div data-testid="searchText">{value.searchText}</div>
              <div data-testid="isLoading">{value.isLoading.toString()}</div>
              <div data-testid="characters">{value.characters.length}</div>
              <div data-testid="isShowingDetails">
                {value.isShowingDetails.toString()}
              </div>
              <div data-testid="selectedId">{value.selectedId}</div>
              <div data-testid="page">
                {value.page.currPage} - {value.page.totalPages}
              </div>
              <div data-testid="isLoadingDetails">
                {value.isLoadingDetails.toString()}
              </div>
              <div data-testid="characterDetails">
                {value.characterDetails.name}
              </div>
            </>
          )}
        </Context.Consumer>
      </ContextProvider>,
    );

    fireEvent.click(screen.getByText('Update Context'));

    expect(screen.getByTestId('searchText')).toHaveTextContent('test');
    expect(screen.getByTestId('isLoading')).toHaveTextContent('true');
    expect(screen.getByTestId('characters')).toHaveTextContent('1');
    expect(screen.getByTestId('isShowingDetails')).toHaveTextContent('false');
    expect(screen.getByTestId('selectedId')).toHaveTextContent('1');
    expect(screen.getByTestId('page')).toHaveTextContent('2 - 5');
    expect(screen.getByTestId('isLoadingDetails')).toHaveTextContent('true');
    expect(screen.getByTestId('characterDetails')).toHaveTextContent('Rick');
  });
});
