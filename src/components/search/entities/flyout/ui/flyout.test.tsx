import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSearch } from '../../../../../shared/hooks/useSearch.tsx';
import { Context } from '../../../../../shared/context/contextProvider.tsx';
import Flyout from './Flyout';
import '@testing-library/jest-dom';

jest.mock('../../../../../shared/hooks/useSearch.tsx');

describe('Flyout tests', () => {
  const handleSetSelectedItemsCallback = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useSearch.mockReturnValue({
      handleSetSelectedItemsCallback,
      selectedItemsWithDetails: [],
    });
  });

  it('renders correctly when no items are selected', () => {
    render(
      <Context.Provider value={{ themeIsDark: true }}>
        <Flyout />
      </Context.Provider>,
    );

    expect(screen.getByText('0 item is selected')).toBeInTheDocument();
    expect(screen.getByText('Unselect all')).toBeDisabled();
    expect(screen.getAllByText('Download')[0]).toBeDisabled();
  });

  it('renders correctly when multiple items are selected', () => {
    useSearch.mockReturnValue({
      handleSetSelectedItemsCallback,
      selectedItemsWithDetails: [
        { id: 1, name: 'Rick' },
        { id: 2, name: 'Morty' },
      ],
    });

    render(
      <Context.Provider value={{ themeIsDark: true }}>
        <Flyout />
      </Context.Provider>,
    );

    expect(screen.getByText('2 items are selected')).toBeInTheDocument();
    expect(screen.getByText('Unselect all')).toBeEnabled();
    expect(screen.getAllByText('Download')[0]).toBeEnabled();
  });

  it('calls handleSetSelectedItemsCallback when Unselect all button is clicked', () => {
    useSearch.mockReturnValue({
      handleSetSelectedItemsCallback,
      selectedItemsWithDetails: [{ id: 1, name: 'Rick' }],
    });

    render(
      <Context.Provider value={{ themeIsDark: true }}>
        <Flyout />
      </Context.Provider>,
    );

    fireEvent.click(screen.getByText('Unselect all'));

    expect(handleSetSelectedItemsCallback).toHaveBeenCalledWith(-1);
  });

  it('triggers file download when Download button is clicked', () => {
    const selectedItemsWithDetails = [
      { id: 1, name: 'Rick', status: 'Alive', species: 'Human' },
      { id: 2, name: 'Morty', status: 'Alive', species: 'Human' },
    ];
    useSearch.mockReturnValue({
      handleSetSelectedItemsCallback,
      selectedItemsWithDetails,
    });

    const clickMock = jest.fn();
    window.URL.createObjectURL = jest.fn();
    window.URL.revokeObjectURL = jest.fn();

    render(
      <Context.Provider value={{ themeIsDark: true }}>
        <Flyout />
      </Context.Provider>,
    );

    const linkElement = screen.getByTestId('link');
    linkElement.click = clickMock;

    fireEvent.click(screen.getAllByText('Download')[0]);

    expect(clickMock).toHaveBeenCalled();
    expect(linkElement.download).toBe('2_characters.csv');
  });
});
