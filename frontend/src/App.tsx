import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Documents from './pages/Documents';
import Assistant from './pages/Assistant';
import EvidenceViewer from './pages/EvidenceViewer';
import MachineHealth from './pages/MachineHealth';
import KnowledgeGraph from './pages/KnowledgeGraph';
import DocumentLibrary from './pages/DocumentLibrary';
import ModelPerformance from './pages/ModelPerformance';
import Settings from './pages/Settings';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/evidence" element={<EvidenceViewer />} />
            <Route path="/machine-health" element={<MachineHealth />} />
            <Route path="/knowledge-graph" element={<KnowledgeGraph />} />
            <Route path="/library" element={<DocumentLibrary />} />
            <Route path="/models" element={<ModelPerformance />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
