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

test.each([
  ['/privacy', /privacy policy/i],
  ['/terms', /terms of service/i],
  ['/refunds', /refund policy/i],
])('%s renders its legal page with one main heading', (path, name) => {
  renderAt(path);
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  expect(screen.getByRole('heading', { level: 1, name })).toBeInTheDocument();
});

test('the footer links the refund policy and offers cookie settings', () => {
  renderAt('/');
  expect(screen.getByRole('link', { name: 'Refund Policy' })).toHaveAttribute('href', '/refunds');
  expect(screen.getByRole('button', { name: 'Cookie settings' })).toBeInTheDocument();
});
