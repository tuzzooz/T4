import React, { useState } from 'react';
import BarraNavegacao from './components/BarraNavegacao';
import ListaClientes from './components/listaClientes';
import FormularioCadastroCliente from './components/cadastroClientes';
import { Cliente } from './services/clienteservices';

function App() {
  const [tela, setTela] = useState('lista-clientes');
  const [recarregar, setRecarregar] = useState(0);
  const [clienteEdicao, setClienteEdicao] = useState<Cliente | null>(null);

  const handleSuccess = () => {
    setRecarregar(prev => prev + 1);
    setTela('lista-clientes');
    setClienteEdicao(null);
  };

  const handleEditarCliente = (cliente: Cliente) => {
    setClienteEdicao(cliente);
    setTela('editar-cliente');
  };

  const handleCancelar = () => {
    setTela('lista-clientes');
    setClienteEdicao(null);
  };

  return (
    <div className="App">
      <BarraNavegacao setTela={setTela} telaAtiva={tela} />
      
      {tela === 'lista-clientes' && (
        <ListaClientes 
          onEditarCliente={handleEditarCliente}
          recarregar={recarregar}
        />
      )}
      
      {tela === 'cadastro-cliente' && (
        <FormularioCadastroCliente 
          onSuccess={handleSuccess}
          onCancelar={handleCancelar}
        />
      )}
      
      {tela === 'editar-cliente' && clienteEdicao && (
        <FormularioCadastroCliente 
          cliente={clienteEdicao}
          modoEdicao={true}
          onSuccess={handleSuccess}
          onCancelar={handleCancelar}
        />
      )}
    </div>
  );
}

export default App;
