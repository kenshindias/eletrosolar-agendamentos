// FormChamado.tsx (mantido como está, sem alterações)
import React, { useState } from 'react';

const FormChamado: React.FC = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [enviado, setEnviado] = useState(false);

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