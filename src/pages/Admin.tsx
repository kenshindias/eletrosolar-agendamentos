import React, { useEffect, useState } from 'react';

interface Chamado {
  id: number;
  nome: string;
  descricao: string;
  status: string;
}

const Admin: React.FC = () => {
  const [senha, setSenha] = useState('');
  const [autenticado, setAutenticado] = useState(false);
  const [chamados, setChamados] = useState<Chamado[]>([]);

  const senhaCorreta = 'admin123'; // Você pode mudar isso depois para algo mais seguro

  useEffect(() => {
    const dados = localStorage.getItem('chamados');
    if (dados) {
      setChamados(JSON.parse(dados));
    }
  }, []);

  const handleStatus = (id: number, novoStatus: string) => {
    const atualizados = chamados.map((c) =>
      c.id === id ? { ...c, status: novoStatus } : c
    );
    setChamados(atualizados);
    localStorage.setItem('chamados', JSON.stringify(atualizados));
  };

  const handleLogout = () => {
    setAutenticado(false);
    setSenha('');
  };

  const limparChamados = () => {
    const confirmar = window.confirm('Tem certeza que deseja apagar todos os chamados?');
    if (confirmar) {
      const senhaInput = prompt('Digite a senha para confirmar:');
      if (senhaInput === senhaCorreta) {
        localStorage.removeItem('chamados');
        setChamados([]);
        alert('Chamados apagados com sucesso.');
      } else {
        alert('Senha incorreta.');
      }
    }
  };

  if (!autenticado) {
    return (
      <div className="admin-login">
        <h2>Área Administrativa</h2>
        <input
          type="password"
          placeholder="Digite a senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button onClick={() => senha === senhaCorreta && setAutenticado(true)}>Entrar</button>
      </div>
    );
  }

  return (
    <section className="admin">
      <h2>Chamados Recebidos</h2>
      <button onClick={handleLogout}>Sair</button>
      <button onClick={limparChamados} style={{ marginLeft: '1rem' }}>🗑️ Limpar Chamados</button>
      <ul>
        {chamados.map((chamado) => (
          <li key={chamado.id}>
            <p>👤 <strong>Nome:</strong> {chamado.nome}</p>
            <p>🛠 <strong>Problema:</strong> {chamado.descricao}</p>
            <p>📌 <strong>Status:</strong> {chamado.status}</p>
            <div>
              <button onClick={() => handleStatus(chamado.id, 'Agendado')}>Agendar</button>
              <button onClick={() => handleStatus(chamado.id, 'Concluído')}>Concluir</button>
              <button onClick={() => handleStatus(chamado.id, 'Pendente')}>Pendente</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Admin;
