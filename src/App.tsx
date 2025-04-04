import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FormChamado from './components/FormChamado';
import Admin from './pages/Admin';
import './styles/main.scss';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Abrir Chamado</Link></li>
          <li><Link to="/admin">Admin</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<FormChamado />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
