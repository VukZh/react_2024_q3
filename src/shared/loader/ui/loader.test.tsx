import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loader from './Loader';

describe('Renders the Loader page', () => {
  it('renders the loader component', () => {
    render(<Loader />);

    const loaderWrapper = screen.getByTestId('loader-wrapper');
    const loader = screen.getByTestId('loader');

    expect(loaderWrapper).toBeInTheDocument();
    expect(loader).toBeInTheDocument();
  });
});
