import React, { useState, useEffect } from 'react';
import { Cliente, clienteService } from '../services/clienteservices';

type Props = {
  onEditarCliente: (cliente: Cliente) => void;
  recarregar?: number;
};

export default function ListaClientes({ onEditarCliente, recarregar }: Props) {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const carregarClientes = async () => {
    try {
      setLoading(true);
      setError(null);
      const dados = await clienteService.listarClientes();
      setClientes(dados);
    } catch (err: any) {
      setError(err.message);
      console.error('Erro ao carregar clientes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarClientes();
  }, [recarregar]);

  const handleExcluir = async (cliente: Cliente) => {
    if (window.confirm(`Tem certeza que deseja excluir o cliente ${cliente.nome}?`)) {
      try {
        await clienteService.excluirCliente(cliente);
        setClientes(clientes.filter(c => c.id !== cliente.id));
        alert('Cliente excluído com sucesso!');
      } catch (error: any) {
        alert(`Erro ao excluir cliente: ${error.message}`);
      }
    }
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <button className="btn btn-primary" onClick={carregarClientes}>
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Lista de Clientes</h2>
        <span className="badge bg-secondary">{clientes.length} clientes</span>
      </div>
      
      {clientes.length === 0 ? (
        <div className="alert alert-info">
          Nenhum cliente cadastrado ainda.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Nome Social</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Cidade</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map(cliente => (
                <tr key={cliente.id}>
                  <td>{cliente.id}</td>
                  <td>{cliente.nome}</td>
                  <td>{cliente.nomeSocial}</td>
                  <td>{cliente.email || 'Não informado'}</td>
                  <td>
                    {cliente.telefones.length > 0 
                      ? `(${cliente.telefones[0].ddd}) ${cliente.telefones[0].numero}`
                      : 'Não informado'
                    }
                  </td>
                  <td>{cliente.endereco.cidade}</td>
                  <td>
                    <button 
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => onEditarCliente(cliente)}
                    >
                      Editar
                    </button>
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => handleExcluir(cliente)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
