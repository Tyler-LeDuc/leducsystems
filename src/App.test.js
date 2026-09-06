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

/* The three pillar ids were renamed after links had already gone out. Old
   deep links must still scroll to the right section, not the top of the page. */
describe('retired pillar anchors still resolve', () => {
  const RENAMED = [
    ['replace-what-you-outgrew', 'ship-the-application'],
    ['get-the-data-out', 'rescue-the-data'],
    ['ai-where-it-earns', 'ai-that-earns-its-place'],
  ];

  /* jsdom has no layout, so record which element ScrollToTop reached for. */
  let scrolledTo;
  beforeAll(() => {
    Element.prototype.scrollIntoView = function scrollIntoView() {
      scrolledTo = this;
    };
  });
  beforeEach(() => {
    scrolledTo = undefined;
  });

  test.each(RENAMED)('#%s still lands on #%s', (oldId, currentId) => {
    const { container } = renderAt(`/services#${oldId}`);

    /* Asserting that an id is absent has no Testing Library query — the
       point of the test is that the old anchor no longer exists at all. */
    /* eslint-disable-next-line testing-library/no-container, testing-library/no-node-access */
    expect(container.querySelector(`#${oldId}`)).toBeNull();
    expect(scrolledTo).toBeDefined();
    expect(scrolledTo.id).toBe(currentId);
  });

  test('a hash that matches nothing falls back to the top of the page', () => {
    renderAt('/services#not-a-section');
    expect(scrolledTo).toBeUndefined();
  });
});
