import React, { useEffect, useState } from 'react';

interface Chamado {
  id: number;
  nome: string;
  descricao: string;
  status: string;
}

const SENHA_CORRETA = 'admin123';

const Admin: React.FC = () => {
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [filtro, setFiltro] = useState<string>('Todos');
  const [tema, setTema] = useState<string>(localStorage.getItem('tema') || 'auto');
  const [autenticado, setAutenticado] = useState<boolean>(localStorage.getItem('autenticado') === 'true');
  const [senha, setSenha] = useState<string>('');
  const [erroSenha, setErroSenha] = useState<string>('');

  useEffect(() => {
    if (tema === 'claro') document.documentElement.classList.remove('dark');
    else if (tema === 'escuro') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('tema', tema);
  }, [tema]);

  useEffect(() => {
    if (autenticado) {
      const data = JSON.parse(localStorage.getItem('chamados') || '[]');
      setChamados(data);
    }
  }, [autenticado]);

  const autenticar = () => {
    if (senha === SENHA_CORRETA) {
      setAutenticado(true);
      localStorage.setItem('autenticado', 'true');
    } else {
      setErroSenha('Senha incorreta.');
    }
  };

  const deslogar = () => {
    setAutenticado(false);
    localStorage.removeItem('autenticado');
  };

  const limparChamados = () => {
    const confirmar = window.confirm("Tem certeza que deseja limpar todos os chamados? Esta ação não poderá ser desfeita.");
    if (!confirmar) return;

    const senhaConfirma = prompt("Digite a senha para confirmar a exclusão dos chamados:");
    if (senhaConfirma !== SENHA_CORRETA) {
      alert("Senha incorreta. Os chamados não foram apagados.");
      return;
    }

    localStorage.removeItem('chamados');
    setChamados([]);
    alert("Todos os chamados foram apagados.");
  };

  const atualizarStatus = (id: number, novoStatus: string) => {
    const atualizados = chamados.map((ch) =>
      ch.id === id ? { ...ch, status: novoStatus } : ch
    );
    setChamados(atualizados);
    localStorage.setItem('chamados', JSON.stringify(atualizados));
  };

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pendente':
        return 'pendente';
      case 'agendado':
        return 'agendado';
      case 'concluído':
      case 'concluido':
        return 'concluido';
      default:
        return '';
    }
  };

  const chamadosFiltrados =
    filtro === 'Todos'
      ? chamados
      : chamados.filter((ch) => ch.status.toLowerCase() === filtro.toLowerCase());

  const alternarTema = () => {
    setTema((prev) => (prev === 'claro' ? 'escuro' : 'claro'));
  };

  if (!autenticado) {
    return (
      <div className="admin-container" style={{
        backgroundColor: 'var(--card-bg)',
        color: 'var(--text-color)',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        maxWidth: '400px',
        margin: '5rem auto',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: '1rem' }}>🔒 Área Administrativa</h2>
        <p>Insira a senha para acessar:</p>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Digite a senha"
          style={{
            padding: '0.8rem',
            fontSize: '1rem',
            borderRadius: '6px',
            border: '1px solid #ccc',
            width: '100%',
            marginTop: '1rem',
            boxSizing: 'border-box'
          }}
        />
        <button
          onClick={autenticar}
          style={{
            marginTop: '1rem',
            padding: '0.8rem',
            fontSize: '1rem',
            backgroundColor: 'var(--primary-color)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          Entrar
        </button>
        {erroSenha && <p style={{ color: 'red', marginTop: '1rem' }}>{erroSenha}</p>}
      </div>
    );
  }

  return (
    <div className="admin-container">
      <button
        onClick={alternarTema}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '10px 14px',
          border: 'none',
          borderRadius: '50%',
          backgroundColor: '#1e90ff',
          color: '#fff',
          cursor: 'pointer',
          fontSize: '1.2rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          zIndex: 9999
        }}
        title="Alternar tema"
      >
        🌓
      </button>

      <button
        onClick={deslogar}
        style={{
          position: 'fixed',
          bottom: '80px',
          right: '20px',
          padding: '10px 14px',
          border: 'none',
          borderRadius: '50%',
          backgroundColor: '#dc3545',
          color: '#fff',
          cursor: 'pointer',
          fontSize: '1.2rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          zIndex: 9999
        }}
        title="Logout"
      >
        🔓
      </button>

      <button
        onClick={limparChamados}
        style={{
          position: 'fixed',
          bottom: '140px',
          right: '20px',
          padding: '10px 14px',
          border: 'none',
          borderRadius: '50%',
          backgroundColor: '#f39c12',
          color: '#fff',
          cursor: 'pointer',
          fontSize: '1.2rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          zIndex: 9999
        }}
        title="Limpar chamados"
      >
        🗑️
      </button>

      <h2>Lista de Chamados</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label><strong>Filtrar por status:</strong></label>{' '}
        <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
          <option value="Todos">Todos</option>
          <option value="Pendente">Pendente</option>
          <option value="Agendado">Agendado</option>
          <option value="Concluído">Concluído</option>
        </select>
      </div>

      {chamadosFiltrados.length === 0 ? (
        <p>Nenhum chamado encontrado.</p>
      ) : (
        <ul className="lista-chamados">
          {chamadosFiltrados.map((ch) => (
            <li key={ch.id} className={`chamado-item ${getStatusClass(ch.status)}`}>
              <p><strong>👤 Nome:</strong> {ch.nome}</p>
              <p><strong>🛠 Problema:</strong> {ch.descricao}</p>
              <p><strong>📌 Status:</strong> {ch.status}</p>
              <div className="botoes">
                <button onClick={() => atualizarStatus(ch.id, 'Agendado')}>📅 Agendar</button>
                <button onClick={() => atualizarStatus(ch.id, 'Concluído')}>✅ Concluir</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Admin;
