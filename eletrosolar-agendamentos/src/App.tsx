import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FormChamado from './components/FormChamado';
import Admin from './pages/Admin';
import './styles/main.scss';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>EletroSolar & Climatização</h1>
          <nav>
            <Link to="/">Abrir Chamado</Link> | <Link to="/admin">Administração</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<FormChamado />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
