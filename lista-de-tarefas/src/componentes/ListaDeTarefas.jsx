import React, { useState} from 'react';
import './ListaDeTarefas.css';
// import axios from 'axios';
import Api from '../services/Api';

const ListaDeTarefas = () => {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [indiceAtualizacao, setIndiceAtualizacao] = useState(null);

  Api.get('https://jsonplaceholder.typicode.com/users')
  .then(function (response) {
    // acessar resposta:
    console.log(response.data);
  })
  .catch(function (error) {
    // aqui temos acesso ao erro, quando alguma coisa inesperada acontece:
    console.log(error);
  })

  const adicionarTarefa = () => {
    if (novaTarefa.trim() !== '') {
      if (indiceAtualizacao !== null) {
        const novasTarefas = [...tarefas];
        novasTarefas[indiceAtualizacao].title = novaTarefa; // Atualiza o título da tarefa existente
        setTarefas(novasTarefas);
        setNovaTarefa('');
        setIndiceAtualizacao(null);
      } else {
        const novaTarefaObj = { id: Date.now(), title: novaTarefa, completed: false };
        setTarefas([...tarefas, novaTarefaObj]); // Adiciona uma nova tarefa à lista
        setNovaTarefa('');
      }
    }
  };

  const removerTarefa = (index) => {
    const novasTarefas = [...tarefas];
    novasTarefas.splice(index, 1);
    setTarefas(novasTarefas);
  };

  const atualizarTarefa = (index) => {
    setNovaTarefa(tarefas[index].title);
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
          <li key={tarefa.id}>
            {tarefa.title} {/* Renderiza o título da tarefa */}
            <button onClick={() => removerTarefa(index)} className='btn-remover'>Remover</button>
            <button onClick={() => atualizarTarefa(index)}>Atualizar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaDeTarefas;
