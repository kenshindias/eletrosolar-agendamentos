import React, { useEffect, useState } from 'react';

const FormChamado: React.FC = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [tema, setTema] = useState<string>(localStorage.getItem('tema') || 'claro');

  useEffect(() => {
    if (tema === 'escuro') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('tema', tema);
  }, [tema]);

  const alternarTema = () => {
    setTema((prev) => (prev === 'claro' ? 'escuro' : 'claro'));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const novoChamado = {
      id: Date.now(),
      nome,
      descricao,
      status: 'Pendente'
    };

    const chamadosExistentes = JSON.parse(localStorage.getItem('chamados') || '[]');
    chamadosExistentes.push(novoChamado);
    localStorage.setItem('chamados', JSON.stringify(chamadosExistentes));

    setNome('');
    setDescricao('');
    setEnviado(true);
  };

  return (
    <section className="form-chamado">
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

      <h2>Abrir um Chamado</h2>
      {enviado && <p className="sucesso">Chamado enviado com sucesso!</p>}
      <form onSubmit={handleSubmit}>
        <label>Nome completo:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <label>Descrição do problema:</label>
        <textarea
          rows={5}
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />

        <button type="submit">Enviar Chamado</button>
      </form>
    </section>
  );
};

export default FormChamado;
