import React, { useState } from 'react';
import './ListaDeTarefas.css';

const ListaDeTarefas = () => {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [indiceAtualizacao, setIndiceAtualizacao] = useState(null);

  const adicionarTarefa = () => {
    if (novaTarefa.trim() !== '') {
      if (indiceAtualizacao !== null) {
        // quando o indice de atualização não for nulo vai atualizar a tarefa existente
        const novasTarefas = [...tarefas];
        novasTarefas[indiceAtualizacao] = novaTarefa;
        setTarefas(novasTarefas);
        setNovaTarefa('');
        setIndiceAtualizacao(null);
      } else {
        // para incluir uma nova tarefa na lista
        setTarefas([...tarefas, novaTarefa]);
        setNovaTarefa('');
      }
    }
  };

  const removerTarefa = (index) => {
    // Remover a tarefa com o índice informado
    const novasTarefas = [...tarefas];
    novasTarefas.splice(index, 1);
    setTarefas(novasTarefas);
  };

  const atualizarTarefa = (index) => {
    // para atualizar o estado para indicar que esta tarefa será atualizada
    setNovaTarefa(tarefas[index]);
    setIndiceAtualizacao(index);
  };

  return (
    <div className="lista-de-tarefas">
      <h2>Adicionar tarefas</h2>

      <div className="tarefa-input">
        <input
          type="text"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          placeholder="Digite uma nova tarefa"
        />
        <button onClick={adicionarTarefa}>{indiceAtualizacao !== null ? 'Atualizar' : 'Adicionar'}</button>
      </div>

      <ul>
        {tarefas.map((tarefa, index) => (
          <li key={index}>
            {tarefa}
            <button onClick={() => removerTarefa(index)} className='btn-remover'>Remover</button>
            <button onClick={() => atualizarTarefa(index)}>Atualizar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaDeTarefas;
