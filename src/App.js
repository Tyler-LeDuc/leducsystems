import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AgenciesPage from './pages/AgenciesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import SchemaToolPage from './pages/SchemaToolPage';
import WorkbookToolPage from './pages/WorkbookToolPage';
import FolderToolPage from './pages/FolderToolPage';
import ToolsIndexPage from './pages/ToolsIndexPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import NotFoundPage from './pages/NotFoundPage';

const EMAILJS_PUBLIC_KEY = 'HIVHympEPP7sMQ_Pl';

/* Anchor ids that have already gone out in proposals and email. The three
   /services pillar ids were renamed when that copy was rewritten; the links
   are public and permanent, so old ones must still land on the right section
   instead of silently dumping the reader at the top of the page.
   Never remove an entry — only ever add. */
const LEGACY_ANCHORS = {
  'replace-what-you-outgrew': 'ship-the-application',
  'get-the-data-out': 'rescue-the-data',
  'ai-where-it-earns': 'ai-that-earns-its-place',
};

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const target =
        document.getElementById(id) ||
        document.getElementById(LEGACY_ANCHORS[id] || '');
      if (target) {
        target.scrollIntoView({ block: 'start' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

/**
 * Everything inside the router. Exported so tests can mount it in a
 * MemoryRouter — a router may not be nested inside another router.
 */
export function AppShell() {
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  return (
    <>
      <ScrollToTop />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/agencies" element={<AgenciesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/tools" element={<ToolsIndexPage />} />
          <Route path="/tools/schema" element={<SchemaToolPage />} />
          <Route path="/tools/workbook" element={<WorkbookToolPage />} />
          <Route path="/tools/folder" element={<FolderToolPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
