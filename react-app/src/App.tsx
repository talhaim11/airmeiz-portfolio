import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ErevShabbatPage from './pages/ErevShabbatPage';
import SwappexPage from './pages/SwappexPage';
import ProjectPage from './pages/ProjectPage';
import LegalPage from './pages/LegalPage';
import AlphaflowLovablePage from './pages/AlphaflowLovablePage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/privacy" element={<LegalPage page="privacy" />} />
      <Route path="/privacy.html" element={<Navigate to="/privacy" replace />} />
      <Route path="/terms" element={<LegalPage page="terms" />} />
      <Route path="/terms.html" element={<Navigate to="/terms" replace />} />
      <Route path="/projects/alphaflow" element={<AlphaflowLovablePage />} />
      <Route path="/projects/alphaflow.html" element={<Navigate to="/projects/alphaflow" replace />} />
      <Route path="/projects/pulsegate" element={<ProjectPage project="pulsegate" />} />
      <Route path="/projects/pulsegate.html" element={<Navigate to="/projects/pulsegate" replace />} />
      <Route path="/projects/swappex" element={<SwappexPage />} />
      <Route path="/projects/swappex.html" element={<Navigate to="/projects/swappex" replace />} />
      <Route path="/projects/swapex" element={<Navigate to="/projects/swappex" replace />} />
      <Route path="/projects/swapex.html" element={<Navigate to="/projects/swappex" replace />} />
      <Route path="/projects/novapay" element={<ProjectPage project="novapay" />} />
      <Route path="/projects/novapay.html" element={<Navigate to="/projects/novapay" replace />} />
      <Route path="/projects/erevshabbat" element={<ErevShabbatPage />} />
      <Route path="/projects/erevshabbat.html" element={<Navigate to="/projects/erevshabbat" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
