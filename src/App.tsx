import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FormChamado from './components/FormChamado';
import Admin from './pages/Admin';
import './styles/main.scss';

function App() {
  return (
    <Router>
      <header>
        <nav>
          <h1>EletroSolar</h1>
          <ul>
            <li><Link to="/">Abrir Chamado</Link></li>
            <li><Link to="/admin">Admin</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<FormChamado />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
