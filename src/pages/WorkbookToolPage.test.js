import React from 'react';
import fs from 'fs';
import path from 'path';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import WorkbookToolPage from './WorkbookToolPage';
import { buildKitchenSinkWorkbook, buildPlainWorkbook } from '../utils/buildTestWorkbook';

function renderTool() {
  return render(
    <MemoryRouter>
      <WorkbookToolPage />
    </MemoryRouter>
  );
}

/* jsdom's File does not implement arrayBuffer, which is the only part of
   the File API this page uses. */
function fakeFile(name, bytes) {
  return {
    name,
    size: bytes.length,
    arrayBuffer: () => Promise.resolve(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength)),
  };
}

function drop(bytes, name = 'book.xlsx') {
  const input = screen.getByLabelText(/choose a file/i);
  fireEvent.change(input, { target: { files: [fakeFile(name, bytes)] } });
}

describe('WorkbookToolPage', () => {
  it('shows the empty state with no results', () => {
    renderTool();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /what is running inside your spreadsheet/i
    );
    expect(screen.queryByText(/This is an application/i)).not.toBeInTheDocument();
  });

  it('says the file is never uploaded', () => {
    renderTool();
    expect(screen.getByText(/never uploaded/i)).toBeInTheDocument();
  });

  it('reports the findings for a workbook full of problems', async () => {
    renderTool();
    drop(buildKitchenSinkWorkbook(), 'ops-master.xlsx');

    expect(await screen.findByText(/very hidden/i)).toBeInTheDocument();
    expect(screen.getByText(/password is saved in the workbook/i)).toBeInTheDocument();
    expect(screen.getByText(/#REF!/)).toBeInTheDocument();
    expect(screen.getByText('ops-master.xlsx')).toBeInTheDocument();
  });

  it('names the system a connection reaches', async () => {
    renderTool();
    drop(buildKitchenSinkWorkbook());

    expect(await screen.findByText('BillingWarehouse')).toBeInTheDocument();
    expect(screen.getByText(/SQLOLEDB · SQL01 · Billing/)).toBeInTheDocument();
    expect(screen.getByText(/SELECT \* FROM dbo\.Invoices/)).toBeInTheDocument();
  });

  it('reads real VBA out of a real macro workbook', async () => {
    const bytes = new Uint8Array(
      fs.readFileSync(path.join(__dirname, '..', 'utils', '__fixtures__', 'SimpleMacro.xlsm'))
    );
    renderTool();
    drop(bytes, 'SimpleMacro.xlsm');

    expect(await screen.findByRole('heading', { name: /the code/i })).toBeInTheDocument();

    const table = screen.getByRole('table');
    expect(within(table).getByText('Module1')).toBeInTheDocument();
    expect(within(table).getByText('ThisWorkbook')).toBeInTheDocument();
  });

  it('says plainly when there is nothing to report', async () => {
    renderTool();
    drop(buildPlainWorkbook());

    /* Queried as the heading specifically: the verdict also appears in the
       visually-hidden live region, which is deliberate. */
    expect(await screen.findByRole('heading', { name: /just a spreadsheet/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /the code/i })).not.toBeInTheDocument();
  });

  it('explains itself when handed the wrong kind of file', async () => {
    renderTool();
    const ole = new Uint8Array(600);
    ole.set([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]);
    drop(ole, 'ledger.xls');

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(/\.xlsx or \.xlsm/i);
  });

  it('does not crash on a file that is not a workbook at all', async () => {
    renderTool();
    drop(new Uint8Array([1, 2, 3, 4, 5]), 'notes.txt');

    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});
