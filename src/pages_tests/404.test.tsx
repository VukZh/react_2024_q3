import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import * as React from 'react';
import NotFound from '../app/not-found.tsx';

test('Renders the NotFound page', () => {
  render(<NotFound />);
  expect(
    screen.getByText(/The requested page is missing.../i),
  ).toBeInTheDocument();
  expect(screen.queryByText(/Not Found/i)).not.toBeInTheDocument();
});
