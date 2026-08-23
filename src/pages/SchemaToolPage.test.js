import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SchemaToolPage from './SchemaToolPage';

function renderTool() {
  return render(
    <MemoryRouter>
      <SchemaToolPage />
    </MemoryRouter>
  );
}

describe('SchemaToolPage', () => {
  it('shows the empty state without results', () => {
    renderTool();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Spreadsheet to schema');
    expect(screen.queryByText(/What is wrong with this data/)).not.toBeInTheDocument();
  });

  it('analyses the example and reports the real problems', () => {
    renderTool();
    fireEvent.click(screen.getByRole('button', { name: /load an example/i }));

    expect(screen.getByText(/What is wrong with this data/)).toBeInTheDocument();

    /* The findings that make the tool worth using at all. */
    expect(screen.getByText(/Mixed date notations/)).toBeInTheDocument();
    expect(screen.getByText(/leading zeros/)).toBeInTheDocument();
    expect(screen.getAllByText(/lookup table/).length).toBeGreaterThan(0);
  });

  it('emits DDL that matches its own advice', () => {
    renderTool();
    fireEvent.click(screen.getByRole('button', { name: /load an example/i }));

    const sql = screen.getByText(/create table/, { selector: 'code' }).textContent;
    expect(sql).toContain('create table orders (');
    expect(sql).toContain('generated always as identity primary key');
    /* Flagged for leading zeros, so it must not be emitted as an integer. */
    expect(sql).toMatch(/phone\s+text/);
    expect(sql).toContain('imported_at');
  });

  it('renames the table from the input', () => {
    renderTool();
    fireEvent.click(screen.getByRole('button', { name: /load an example/i }));

    fireEvent.change(screen.getByDisplayValue('orders'), {
      target: { value: 'Shipment Log' },
    });

    expect(screen.getByText(/create table shipment_log \(/)).toBeInTheDocument();
  });

  it('lists every column with its inferred type', () => {
    renderTool();
    fireEvent.click(screen.getByRole('button', { name: /load an example/i }));

    const table = screen.getByRole('table');
    const rows = within(table).getAllByRole('row');
    /* Header row plus one per spreadsheet column. */
    expect(rows).toHaveLength(8);
    expect(within(table).getByText('numeric(12,2)')).toBeInTheDocument();
  });

  it('clears back to the empty state', () => {
    renderTool();
    fireEvent.click(screen.getByRole('button', { name: /load an example/i }));
    fireEvent.click(screen.getByRole('button', { name: /^clear$/i }));

    expect(screen.queryByText(/What is wrong with this data/)).not.toBeInTheDocument();
  });
});
