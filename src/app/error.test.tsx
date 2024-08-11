import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ErrorBoundary from './Error';

describe('ErrorBoundary test', () => {
  it('render without error', () => {
    render(
      <ErrorBoundary>
        <div>Child Component</div>
      </ErrorBoundary>,
    );
    expect(screen.queryByText(/Child Component/i)).toBeInTheDocument();
  });

  it('renders error message when an error is caught', () => {
    const ConsoleLogMock = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    const ChildComponent = () => {
      throw new Error('my error');
    };

    render(
      <ErrorBoundary>
        <ChildComponent />
      </ErrorBoundary>,
    );

    expect(screen.queryByText(/Something went wrong./i)).toBeInTheDocument();

    ConsoleLogMock.mockRestore();
  });
});
