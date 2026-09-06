import React from 'react';
import fs from 'fs';
import path from 'path';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AccessToolPage from './AccessToolPage';

function renderTool() {
  return render(
    <MemoryRouter>
      <AccessToolPage />
    </MemoryRouter>
  );
}

const database = () =>
  new Uint8Array(fs.readFileSync(path.join(__dirname, '..', 'utils', '__fixtures__', 'accessQueryTest.mdb')));

/* jsdom's File does not implement arrayBuffer, which is the only part of the
   File API this page uses. */
function fakeFile(name, bytes) {
  return {
    name,
    size: bytes.length,
    arrayBuffer: () =>
      Promise.resolve(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength)),
  };
}

function drop(bytes, name = 'operations.mdb') {
  fireEvent.change(screen.getByLabelText(/choose a database/i), {
    target: { files: [fakeFile(name, bytes)] },
  });
}

describe('AccessToolPage', () => {
  it('promises specifically, not vaguely', () => {
    renderTool();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/what is actually in your access database/i);
    /* "It's local" is not checkable. "The records are never read" is. */
    expect(screen.getByText(/never uploaded, and the records are never read/i)).toBeInTheDocument();
  });

  it('reads a real database and names its tables', async () => {
    renderTool();
    drop(database());

    expect(await screen.findByRole('heading', { name: /just data/i })).toBeInTheDocument();

    const table = screen.getByRole('table');
    expect(within(table).getByText('Table1')).toBeInTheDocument();
    expect(within(table).getByText('Table2')).toBeInTheDocument();
    expect(within(table).getByText('Table3')).toBeInTheDocument();
  });

  it('reports the version it read off the header', async () => {
    renderTool();
    drop(database(), 'jobs.mdb');
    expect(await screen.findByText(/jobs\.mdb · Access 2000–2003/)).toBeInTheDocument();
  });

  it('counts the objects that will not convert', async () => {
    renderTool();
    drop(database());
    expect(await screen.findByText(/9 saved queries/)).toBeInTheDocument();
    expect(screen.getByText(/business logic in a place nobody looks/i)).toBeInTheDocument();
  });

  it('says when nothing in the file records how the tables relate', async () => {
    renderTool();
    drop(database());
    expect(await screen.findByText(/No relationships are defined/)).toBeInTheDocument();
  });

  it('emits Postgres DDL for the tables it read', async () => {
    renderTool();
    drop(database());

    expect(await screen.findByRole('heading', { name: /schema it should become/i })).toBeInTheDocument();
    const sql = screen.getByRole('region', { name: /generated schema/i }).textContent;
    expect(sql).toContain('create table table1 (');
    expect(sql).toContain('create table table3 (');
  });

  it('is honest that the schema is a starting point', async () => {
    renderTool();
    drop(database());
    expect(await screen.findByText(/no keys, no indexes, and no\s+constraints/i)).toBeInTheDocument();
  });

  it('explains a file that is not an Access database', async () => {
    renderTool();
    drop(new Uint8Array([0x50, 0x4b, 3, 4, ...new Array(64).fill(0)]), 'book.xlsx');

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(/not an Access database/i);
  });

  it('explains an encrypted database rather than calling it empty', async () => {
    const bytes = database();
    bytes.fill(0x7f, 2 * 4096, 3 * 4096);

    renderTool();
    drop(bytes, 'locked.mdb');

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(/password-protected|could not be read/i);
  });

  it('does not crash on a file that is not a database at all', async () => {
    renderTool();
    drop(new Uint8Array([1, 2, 3, 4, 5]), 'notes.txt');

    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});
