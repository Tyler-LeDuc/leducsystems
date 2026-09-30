import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppShell } from './App';

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppShell />
    </MemoryRouter>
  );
}

test('renders the home page with a single main heading', () => {
  renderAt('/');
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
});

test('renders the primary navigation', () => {
  renderAt('/');
  expect(screen.getByRole('navigation', { name: /primary/i })).toBeInTheDocument();
});

test('unknown routes render the not found page', () => {
  renderAt('/pricing');
  expect(
    screen.getByRole('heading', { level: 1, name: /does not exist/i })
  ).toBeInTheDocument();
});
