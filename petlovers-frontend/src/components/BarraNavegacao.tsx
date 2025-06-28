import React from 'react';

type Props = {
  setTela: (tela: string) => void;
  telaAtiva: string;
};

export default function BarraNavegacao({ setTela, telaAtiva }: Props) {
  const getBotaoClass = (tela: string) => 
    `btn ${telaAtiva === tela ? 'btn-primary' : 'btn-outline-primary'} me-2`;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <span className="navbar-brand"> Pet Lovers</span>
        
        <div className="d-flex">
          <button 
            className={getBotaoClass('lista-clientes')}
            onClick={() => setTela('lista-clientes')}>
            Lista Clientes
          </button>
          
          <button 
            className={getBotaoClass('cadastro-cliente')}
            onClick={() => setTela('cadastro-cliente')}>
            Cadastrar Cliente
          </button>
        </div>
      </div>
    </nav>
  );
}
