import { render } from '@testing-library/react';
import React from 'react';

import App from './App';

test('renders: and save to reload', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/and save to reload/i);
  expect(linkElement).toBeInTheDocument();
});
