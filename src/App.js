import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [newRepository, setNewRepository] = useState('');

  useEffect(() => {
    handleGetRepositories();
  }, []);

  async function handleGetRepositories() {
    const response = await api.get('/repositories');

    if (response.status === 200) {
      setRepositories(response.data);
    }
  }

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: newRepository,
    });

    if (response.status === 200) {
      setRepositories([...repositories, response.data]);
    }
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);

    if (response.status === 204) {
      const newRepositories = [...repositories];

      const repositoryIndex = newRepositories.findIndex(
        repository => repository.id === id
      );

      newRepositories.splice(repositoryIndex, 1);

      setRepositories(newRepositories);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <input type="text" onChange={(e) => setNewRepository(e.target.value)} />
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
