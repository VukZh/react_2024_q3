import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import NotFound from './notFound';
import * as React from 'react';

test('Renders the NotFound page', () => {
  render(<NotFound />);
  expect(
    screen.getByText(/The requested page is missing.../i),
  ).toBeInTheDocument();
  expect(screen.queryByText(/Not Found/i)).not.toBeInTheDocument();
});
