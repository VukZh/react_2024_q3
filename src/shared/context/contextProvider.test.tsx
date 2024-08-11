import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ContextProvider, Context } from './contextProvider.tsx';
import '@testing-library/jest-dom';

describe('ContextProvider tests', () => {
  it('should provide the correct initial context value', () => {
    render(
      <ContextProvider>
        <Context.Consumer>
          {(value) => (
            <>
              <span data-testid="theme-value">
                {value.themeIsDark.toString()}
              </span>
              <button onClick={() => value.setThemeIsDark(false)}>
                Switch
              </button>
            </>
          )}
        </Context.Consumer>
      </ContextProvider>,
    );

    const themeValueElement = screen.getByTestId('theme-value');
    expect(themeValueElement).toHaveTextContent('true');
    expect(screen.getByRole('button', { name: 'Switch' })).toBeInTheDocument();
  });

  it('should update the context value when setThemeIsDark is called', () => {
    render(
      <ContextProvider>
        <Context.Consumer>
          {(value) => (
            <>
              <span data-testid="theme-value">
                {value.themeIsDark.toString()}
              </span>
              <button onClick={() => value.setThemeIsDark(false)}>
                Switch
              </button>
            </>
          )}
        </Context.Consumer>
      </ContextProvider>,
    );

    const themeValueElement = screen.getByTestId('theme-value');
    const toggleButton = screen.getByRole('button', { name: 'Switch' });
    expect(themeValueElement).toHaveTextContent('true');
    fireEvent.click(toggleButton);
    expect(themeValueElement).toHaveTextContent('false');
  });
});
