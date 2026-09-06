import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FolderToolPage from './FolderToolPage';
import { buildZip } from '../utils/buildTestWorkbook';

function renderTool() {
  return render(
    <MemoryRouter>
      <FolderToolPage />
    </MemoryRouter>
  );
}

const sheets = (names) =>
  names.map((name, i) => `<sheet name="${name}" sheetId="${i + 1}"/>`).join('');

function workbook({ sheetNames = ['Data'], links = [], creator = '', modifiedBy = '', macros = false } = {}) {
  const parts = [
    {
      name: 'xl/workbook.xml',
      data: `<?xml version="1.0"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheets>${sheets(sheetNames)}</sheets></workbook>`,
    },
  ];
  if (links.length) {
    parts.push({
      name: 'xl/externalLinks/_rels/externalLink1.xml.rels',
      data: `<?xml version="1.0"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${links
        .map((t, i) => `<Relationship Id="r${i}" Target="${t}" TargetMode="External"/>`)
        .join('')}</Relationships>`,
    });
  }
  if (creator || modifiedBy) {
    parts.push({
      name: 'docProps/core.xml',
      data: `<?xml version="1.0"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:creator>${creator}</dc:creator><cp:lastModifiedBy>${modifiedBy}</cp:lastModifiedBy></cp:coreProperties>`,
    });
  }
  if (macros) parts.push({ name: 'xl/vbaProject.bin', data: 'not a real container' });
  return buildZip(parts);
}

/* A stand-in for the File objects a directory picker produces. jsdom's Blob
   supports slice(), which is all the scanner uses. */
function asFile(bytes, relativePath, lastModified = 1_700_000_000_000) {
  const blob = new Blob([bytes]);
  Object.defineProperty(blob, 'name', { value: relativePath.split('/').pop() });
  Object.defineProperty(blob, 'webkitRelativePath', { value: relativePath });
  Object.defineProperty(blob, 'lastModified', { value: lastModified });
  return blob;
}

function pick(files) {
  fireEvent.change(screen.getByLabelText(/choose a folder/i), { target: { files } });
}

describe('FolderToolPage', () => {
  it('leads with what it reads and does not upload', () => {
    renderTool();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/map the spreadsheets/i);
    expect(screen.getByText(/nothing is uploaded/i)).toBeInTheDocument();
    /* The parts it reads are named, because "it's all local" is not
       checkable and a list of four filenames is. */
    expect(screen.getByText('xl/workbook.xml')).toBeInTheDocument();
    expect(screen.getByText('docProps/core.xml')).toBeInTheDocument();
  });

  it('says so when a folder has no workbooks in it', async () => {
    renderTool();
    pick([asFile(new Uint8Array([1, 2, 3]), 'Notes/readme.txt')]);
    expect(await screen.findByRole('alert')).toHaveTextContent(/no \.xlsx or \.xlsm/i);
  });

  it('maps which file the others read from', async () => {
    renderTool();
    pick([
      asFile(workbook(), 'Finance/Rates/rates.xlsx'),
      asFile(workbook({ links: ['../Rates/rates.xlsx'] }), 'Finance/Q3/a.xlsx'),
      asFile(workbook({ links: ['../Rates/rates.xlsx'] }), 'Finance/Q3/b.xlsx'),
    ]);

    expect(await screen.findByRole('heading', { name: /3 workbooks/i })).toBeInTheDocument();

    const table = await screen.findByRole('table');
    expect(within(table).getByText('Finance/Rates/rates.xlsx')).toBeInTheDocument();
    expect(within(table).getByText('2 files')).toBeInTheDocument();
  });

  it('lists links that leave the folder', async () => {
    renderTool();
    pick([asFile(workbook({ links: ['C:\\Users\\dh\\Desktop\\targets.xlsx'] }), 'Reports/summary.xlsx')]);

    expect(await screen.findByRole('heading', { name: /pointing somewhere else/i })).toBeInTheDocument();
    expect(screen.getByText(/Desktop/)).toBeInTheDocument();
  });

  it('groups copies of one workbook and names the newest', async () => {
    renderTool();
    const shape = { sheetNames: ['Input', 'Calc', 'Output'] };
    pick([
      asFile(workbook(shape), 'Models/Margin Model v1.xlsx', 1),
      asFile(workbook(shape), 'Models/Margin Model v2.xlsx', 2),
      asFile(workbook(shape), 'Models/Copy of Margin Model FINAL.xlsx', 3),
    ]);

    expect(await screen.findByRole('heading', { name: /one workbook, several copies/i })).toBeInTheDocument();
    expect(screen.getByText(/Copy of Margin Model FINAL\.xlsx — newest/)).toBeInTheDocument();
  });

  it('raises key-person risk only for a file others depend on', async () => {
    renderTool();
    pick([
      asFile(workbook({ creator: 'D Halloran', modifiedBy: 'D Halloran' }), 'rates.xlsx'),
      asFile(workbook({ links: ['rates.xlsx'], creator: 'R Okafor', modifiedBy: 'R Okafor' }), 'a.xlsx'),
    ]);

    expect(await screen.findByText(/created and last saved by the same name: D Halloran/i)).toBeInTheDocument();
  });

  it('does not draw a graph when nothing links to anything', async () => {
    renderTool();
    pick([asFile(workbook(), 'a.xlsx'), asFile(workbook(), 'b.xlsx')]);

    expect(await screen.findByRole('heading', { name: /2 workbooks/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /what reads from what/i })).not.toBeInTheDocument();
  });

  it('draws the graph when files do reference each other', async () => {
    renderTool();
    pick([
      asFile(workbook(), 'rates.xlsx'),
      asFile(workbook({ links: ['rates.xlsx'] }), 'a.xlsx'),
    ]);

    expect(await screen.findByRole('heading', { name: /what reads from what/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /1 link between 2 workbooks/i })).toBeInTheDocument();
  });

  it('counts files it could not open rather than hiding them', async () => {
    renderTool();
    pick([
      asFile(workbook(), 'good.xlsx'),
      asFile(new Uint8Array([0xd0, 0xcf, 0x11, 0xe0]), 'old.xlsx'),
    ]);

    expect(await screen.findByRole('heading', { name: /1 workbook,/i })).toBeInTheDocument();
    expect(screen.getByText(/1 file could not be opened/i)).toBeInTheDocument();
  });
});
