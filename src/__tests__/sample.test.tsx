import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders button', () => {
  render(<App />);
  const buttonElement = screen.getByRole('button', { name: /click me/i });
  expect(buttonElement).toBeInTheDocument();
});