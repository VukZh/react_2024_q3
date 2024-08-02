import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeSwitcher from './ThemeSwitcher';
import '@testing-library/jest-dom';
import { Context } from '../../../../../shared/context/contextProvider.tsx';

describe('ThemeSwitcher tests', () => {
  const setThemeIsDarkMock = jest.fn();

  beforeEach(() => {
    render(
      <Context.Provider
        value={{
          themeIsDark: true,
          setThemeIsDark: setThemeIsDarkMock,
        }}>
        <ThemeSwitcher />
      </Context.Provider>,
    );
  });

  it('should render the theme switcher with radio buttons', () => {
    const darkRadioButton = screen.getByLabelText('Dark');
    const lightRadioButton = screen.getByLabelText('Light');
    expect(darkRadioButton).toBeInTheDocument();
    expect(lightRadioButton).toBeInTheDocument();
  });

  it('should call setThemeIsDark with true when the dark radio button is clicked', () => {
    const darkRadioButton = screen.getByLabelText('Dark');
    fireEvent.click(darkRadioButton);
    expect(setThemeIsDarkMock).toHaveBeenCalledWith(true);
  });

  it('should call setThemeIsDark with false when the light radio button is clicked', () => {
    const lightRadioButton = screen.getByLabelText('Light');
    fireEvent.click(lightRadioButton);
    expect(setThemeIsDarkMock).toHaveBeenCalledWith(false);
  });
});
